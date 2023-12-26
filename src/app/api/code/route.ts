import { auth } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';

import { db } from '@/db';
import { code, users } from '@/db/schema';
import { openai } from '@/lib/open-ai';

interface ConversationRequest {
  messages: ChatCompletionMessageParam[];
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
    const { messages }: ConversationRequest = body;

    if (!messages) {
      return new NextResponse('Messages are required', { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
    });

    if (!response.choices) {
      return new NextResponse('No response from OpenAI', { status: 500 });
    }

    messages.push(response.choices[0].message);

    const user = await db.query.users.findFirst({
      where: eq(users.userId, userId),
    });

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const existingCodeLength = await db.query.code
      .findMany({
        where: eq(code.authorId, user.id),
      })
      .then(codes => codes.length)
      .catch(() => -1);

    if (existingCodeLength === -1) {
      messages.forEach(async ({ role, content }, index) => {
        await db
          .insert(code)
          .values({
            authorId: user.id,
            index,
            role,
            content: content as string,
          })
          .execute();
      });

      return NextResponse.json(response.choices[0].message, { status: 200 });
    }

    messages.forEach(async ({ role, content }, index) => {
      index >= existingCodeLength &&
        (await db
          .insert(code)
          .values({
            authorId: user.id,
            index,
            role,
            content: content as string,
          })
          .execute());
    });

    return NextResponse.json(response.choices[0].message, { status: 200 });
  } catch (err) {
    console.log('CODE_POST_ERROR:', err);
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

    await db.delete(code).where(eq(code.authorId, user.id)).execute();

    return new NextResponse('Deleted Code', { status: 200 });
  } catch (err: any) {
    console.log('CODE_DELETE_ERROR:', err);
    return new NextResponse('Internal Error', { status: 500 });
  }
};
