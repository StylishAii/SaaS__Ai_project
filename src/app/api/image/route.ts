import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

import { Amount, Resolution } from '@/app/(routes)/image/data';
import { openai } from '@/lib/openai';

interface ImageBody {
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
    const { prompt, amount = '1', resolution = '512x512' }: ImageBody = body;

    if (!prompt) {
      return new NextResponse('Prompt is required', { status: 400 });
    }

    const response = await openai.images.generate({
      prompt,
      model: 'dall-e-2',
      n: parseInt(amount),
      size: resolution,
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (err) {
    console.log('IMAGE_ERROR:', err);
    return new NextResponse('Internal Error', { status: 500 });
  }
};
