import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

import { AudioLength } from '@/app/(routes)/music/data';
import { replicate } from '@/lib/replicate-ai';

interface MusicRequest {
  prompt: string;
  length: AudioLength;
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
    const { prompt, length = '8' }: MusicRequest = body;

    if (!prompt) {
      return new NextResponse('Prompt is required', { status: 400 });
    }

    const response = await replicate.run(
      'meta/musicgen:b05b1dff1d8c6dc63d14b0cdb42135378dcb87f6373b0d3d341ede46e59e2b38',
      {
        input: {
          top_k: 250,
          top_p: 0,
          prompt,
          duration: parseInt(length),
          temperature: 1,
          continuation: false,
          model_version: 'stereo-large',
          output_format: 'wav',
          multi_band_diffusion: false,
          normalization_strategy: 'peak',
          classifier_free_guidance: 3,
        },
      },
    );

    return NextResponse.json(response, { status: 200 });
  } catch (err) {
    console.log('MUSIC_ERROR:', err);
    return new NextResponse('Internal Error', { status: 500 });
  }
};
