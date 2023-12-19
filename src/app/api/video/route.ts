import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

import { replicate } from '@/lib/replicate-ai';

interface VideoRequest {
  prompt: string;
}

export const POST = async (req: Request) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!replicate.auth) {
      return new NextResponse('Replicate API Key not configured', {
        status: 500,
      });
    }

    const body = await req.json();
    const { prompt }: VideoRequest = body;

    if (!prompt) {
      return new NextResponse('Prompt is required', { status: 400 });
    }

    const response = await replicate.run(
      'anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351',
      {
        input: {
          prompt,
        },
      },
    );

    return NextResponse.json(response, { status: 200 });
  } catch (err) {
    console.log('VIDEO_ERROR:', err);
    return new NextResponse('Internal Error', { status: 500 });
  }
};
