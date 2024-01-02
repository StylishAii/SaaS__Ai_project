import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { auth } from '@clerk/nextjs';
import crypto from 'crypto';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { Bucket } from 'sst/node/bucket';

import { Amount, Resolution } from '@/app/(routes)/image/data';
import { db } from '@/db';
import { image, users } from '@/db/schema';
import { openai } from '@/lib/open-ai';
import axios from 'axios';

interface ImageRequest {
  prompt: string;
  amount?: Amount;
  resolution?: Resolution;
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
    const { prompt, amount = '1', resolution = '512x512' }: ImageRequest = body;

    if (!prompt) {
      return new NextResponse('Prompt is required', { status: 400 });
    }

    const response = await openai.images.generate({
      prompt,
      model: 'dall-e-2',
      n: parseInt(amount),
      size: resolution,
    });

    const user = await db.query.users.findFirst({
      where: eq(users.userId, userId),
    });

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    response.data.forEach(async imageData => {
      const { url: imageUrl } = imageData;

      if (imageUrl) {
        const key = crypto.randomUUID();
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

        const s3Response = await axios.put(s3Url, imageBlob, {
          headers: {
            'Content-Type': 'image/png',
          },
        });

        if (s3Response.status === 200) {
          await db
            .insert(image)
            .values({
              authorId: user.id,
              url: objectUrl,
            })
            .execute();
        }
      }
    });

    const images = await db
      .select()
      .from(image)
      .where(eq(image.authorId, user.id));

    return NextResponse.json(images, { status: 200 });
  } catch (err) {
    console.log('IMAGE_ERROR:', err);
    return new NextResponse('Internal Error', { status: 500 });
  }
};
