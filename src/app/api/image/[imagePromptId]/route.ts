import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

import { db } from '@/db';
import { imagePrompt, users } from '@/db/schema';
import { openai } from '@/lib/open-ai';
import { deleteImageFromAzureBlob } from '@/lib/azure';

interface RequestProps {
  params: { imagePromptId: number };
}

export const DELETE = async (req: Request, { params }: RequestProps) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!openai.apiKey) {
      return new NextResponse('OpenAI API Key not configured', { status: 500 });
    }

    const user = await db.query.users.findFirst({
      where: eq(users.userId, userId),
    });

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const prompt = await db.query.imagePrompt.findFirst({
      where: eq(imagePrompt.id, params.imagePromptId),
      with: { images: true },
      columns: {},
    });

    if (!prompt) {
      return new NextResponse('Prompt not found', { status: 404 });
    }

    await Promise.all(
      prompt.images.map(async ({ key }) => {
        await deleteImageFromAzureBlob(
          key,
          process.env.AZURE_STORAGE_CONTAINER,
        );
      }),
    );

    await db
      .delete(imagePrompt)
      .where(eq(imagePrompt.id, params.imagePromptId))
      .execute();

    return new NextResponse('Deleted Image', { status: 200 });
  } catch (err: any) {
    console.log('IMAGE_DELETE_ERROR:', err);
    return new NextResponse('Internal Error', { status: 500 });
  }
};
