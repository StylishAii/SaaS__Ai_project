import { auth } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

import { db } from '@/db';
import { imagePrompt, users } from '@/db/schema';
import { openai } from '@/lib/open-ai';

interface RequestProps {
  params: { imageId: number };
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

    await db
      .delete(imagePrompt)
      .where(eq(imagePrompt.id, params.imageId))
      .execute();

    return new NextResponse('Deleted Image', { status: 200 });
  } catch (err: any) {
    console.log('IMAGE_DELETE_ERROR:', err);
    return new NextResponse('Internal Error', { status: 500 });
  }
};
