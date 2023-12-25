'use server';

import { eq } from 'drizzle-orm';
import { orderBy } from 'lodash';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';

import { db } from '@/db';
import { prompt } from '@/db/schema';
import { User } from '@/db/types';

export const fetchPrompts = async (
  user: User,
): Promise<ChatCompletionMessageParam[]> => {
  const prompts = await db.query.prompt
    .findMany({
      where: eq(prompt.authorId, user.id),
    })
    .then(
      prompts =>
        /* Order and Return Mapped Prompts to only include role and content */
        orderBy(prompts, 'index', 'asc').map(({ role, content }) => ({
          role,
          content,
        })) as ChatCompletionMessageParam[],
    );

  return prompts;
};
