'use server';

import { eq } from 'drizzle-orm';
import { orderBy } from 'lodash';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';

import { db } from '@/db';
import { conversation } from '@/db/schema';
import { User } from '@/db/types';

export const fetchConversations = async (
  user: User,
): Promise<ChatCompletionMessageParam[]> => {
  const conversations = await db.query.conversation
    .findMany({
      where: eq(conversation.authorId, user.id),
    })
    .then(
      conversations =>
        /* Order and Return Mapped Conversations to only include role and content */
        orderBy(conversations, 'index', 'asc').map(({ role, content }) => ({
          role,
          content,
        })) as ChatCompletionMessageParam[],
    );

  return conversations;
};
