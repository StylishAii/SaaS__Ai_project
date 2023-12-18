import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

import { openai } from '@/lib/openai';

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
    const { messages } = body;

    if (!messages) {
      return new NextResponse('Messages are required', { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
    });

    return NextResponse.json(response.choices[0].message, { status: 200 });
  } catch (err) {
    console.log('CONVERSATION_ERROR:', err);
    return new NextResponse('Internal Error', { status: 500 });
  }
};
