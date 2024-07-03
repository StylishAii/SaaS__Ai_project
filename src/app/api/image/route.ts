import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { Image, ImageGenerateParams } from 'openai/resources/images.mjs';

import { Amount } from '@/app/(routes)/image/data';
import { db } from '@/db';
import { image, imagePrompt, users } from '@/db/schema';
import { deleteImageFromAzureBlob, uploadImageToAzureBlob } from '@/lib/azure';
import { openai } from '@/lib/open-ai';

interface ImageRequest {
  prompt: string;
  amount?: Amount;
  resolution?: ImageGenerateParams['size'];
  model?: ImageGenerateParams['model'];
}

export const POST = async (req: Request) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!openai.apiKey) {
      return new NextResponse('OpenAI API Key not configured', { status: 500 });
    }

    const body = await req.json();
    const {
      prompt,
      amount = '1',
      resolution = '512x512',
      model = 'dall-e-2',
    }: ImageRequest = body;

    const n = model === 'dall-e-3' ? 1 : parseInt(amount);

    if (!prompt) {
      return new NextResponse('Prompt is required', { status: 400 });
    }

    const response = await openai.images.generate({
      prompt,
      model,
      n,
      size: resolution,
    });

    if (!response || !response.data) {
      return new NextResponse('Internal Error', { status: 500 });
    }

    const user = await db.query.users.findFirst({
      where: eq(users.userId, userId),
    });

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const promptId = await db
      .insert(imagePrompt)
      .values({
        authorId: user.id,
        prompt,
        amount: n,
        resolution: resolution || '',
        model: model || '',
      })
      .returning({ id: imagePrompt.id });

    await Promise.all(
      response.data.map(async (imageData: Image) => {
        const { url: imageUrl } = imageData;

        if (imageUrl) {
          try {
            const { key, url } = await uploadImageToAzureBlob(
              imageUrl,
              process.env.AZURE_STORAGE_CONTAINER,
            );

            await db.insert(image).values({
              promptId: promptId[0].id,
              key,
              url,
            });
          } catch (err) {
            console.error('Upload failed', err);
          }
        }
      }),
    );

    const imagePrompts = await db.query.imagePrompt.findMany({
      where: eq(imagePrompt.authorId, user.id),
      with: { images: true },
    });

    return NextResponse.json(imagePrompts, { status: 200 });
  } catch (err) {
    console.log('IMAGE_ERROR:', err);
    return new NextResponse('Internal Error', { status: 500 });
  }
};

export const DELETE = async (req: Request) => {
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

    const imagePrompts = await db.query.imagePrompt.findMany({
      where: eq(imagePrompt.authorId, user.id),
      with: { images: true },
      columns: {},
    });

    await Promise.all(
      imagePrompts.map(
        async ({ images }) =>
          await Promise.all(
            images.map(async ({ key }) => {
              await deleteImageFromAzureBlob(
                key,
                process.env.AZURE_STORAGE_CONTAINER,
              );
            }),
          ),
      ),
    );

    await db
      .delete(imagePrompt)
      .where(eq(imagePrompt.authorId, user.id))
      .execute();

    return new NextResponse('Deleted Images', { status: 200 });
  } catch (err: any) {
    console.log('IMAGES_DELETE_ERROR:', err);
    return new NextResponse('Internal Error', { status: 500 });
  }
};
