import { auth } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';

import { db } from '@/db';
import { prompt, users } from '@/db/schema';
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

    if (user) {
      const existingPromptsLength = await db.query.prompt
        .findMany({
          where: eq(prompt.authorId, user.id),
        })
        .then(prompts => prompts.length)
        .catch(() => -1);

      if (existingPromptsLength === -1) {
        messages.forEach(async ({ role, content }, index) => {
          await db
            .insert(prompt)
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
        index >= existingPromptsLength &&
          (await db
            .insert(prompt)
            .values({
              authorId: user.id,
              index,
              role,
              content: content as string,
            })
            .execute());
      });
    }

    return NextResponse.json(response.choices[0].message, { status: 200 });
  } catch (err) {
    console.log('CONVERSATION_ERROR:', err);
    return new NextResponse('Internal Error', { status: 500 });
  }
};
