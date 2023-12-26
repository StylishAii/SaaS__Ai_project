'use server';

import { eq } from 'drizzle-orm';
import { orderBy } from 'lodash';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';

import { db } from '@/db';
import { users } from '@/db/schema';

export const fetchConversations = async (
  userId: string,
): Promise<ChatCompletionMessageParam[]> => {
  const user = await db.query.users.findFirst({
    where: eq(users.userId, userId),
    with: { conversations: true },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const { conversations } = user;

  const modifiedConversation =
    conversations.length === 0
      ? [
          {
            role: 'system' as const,
            content: user.about,
          },
        ]
      : (orderBy(conversations, 'index', 'asc').map(({ role, content }) => ({
          role,
          content,
        })) as ChatCompletionMessageParam[]);

  return modifiedConversation;
};
