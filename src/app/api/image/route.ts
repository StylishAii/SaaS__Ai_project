import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { auth } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { Bucket } from 'sst/node/bucket';

import { Amount } from '@/app/(routes)/image/data';
import { db } from '@/db';
import { image, imagePrompt, users } from '@/db/schema';
import { openai } from '@/lib/open-ai';
import axios from 'axios';
import { Image, ImageGenerateParams } from 'openai/resources/images.mjs';

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
          const key = `${crypto.randomUUID()}.png`;
          const bucket = Bucket.images.bucketName;

          const command = new PutObjectCommand({
            ACL: 'public-read',
            Key: key,
            Bucket: bucket,
            ContentType: 'image/png',
          });

          const objectUrl = `https://${bucket}.s3.amazonaws.com/${key}`;

          const s3Url = await getSignedUrl(new S3Client({}), command);

          const imageBlob = await fetch(imageUrl).then(res => res.blob());

          const s3Response = await axios.put(s3Url, imageBlob);

          if (s3Response.status === 200) {
            await db.insert(image).values({
              promptId: promptId[0].id,
              url: objectUrl,
            });
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
