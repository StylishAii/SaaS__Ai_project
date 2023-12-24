import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';

import { db } from '@/db';
import { prompt, users } from '@/db/schema';
import { openai } from '@/lib/open-ai';
import { and, eq } from 'drizzle-orm';

interface ConversationRequest {
  messages: ChatCompletionMessageParam[];
}

interface PromptToAdd {
  index: number;
  authorId: number;
  role: ChatCompletionMessageParam['role'];
  content: string;
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

    const responseChoice = response.choices[0].message;

    // Run database operations in the background
    (async () => {
      messages.push(responseChoice);

      const user = await db.query.users.findFirst({
        where: eq(users.userId, userId),
      });

      if (user) {
        const promptsToAdd: PromptToAdd[] = messages.map(
          ({ role, content }, index) => ({
            index,
            authorId: user.id,
            role,
            content: content as string,
          }),
        );

        promptsToAdd.forEach(async ({ role, content, index, authorId }) => {
          const existingPrompt = await db.query.prompt.findFirst({
            where: and(eq(prompt.authorId, authorId), eq(prompt.index, index)),
          });

          if (!existingPrompt) {
            db.insert(prompt)
              .values({ role, content, index, authorId })
              .execute();
          }
        });
      }
    })();

    return NextResponse.json(responseChoice, { status: 200 });
  } catch (err) {
    console.log('CONVERSATION_ERROR:', err);
    return new NextResponse('Internal Error', { status: 500 });
  }
};
