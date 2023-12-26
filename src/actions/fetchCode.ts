'use server';

import { eq } from 'drizzle-orm';
import { orderBy } from 'lodash';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';

import { db } from '@/db';
import { code } from '@/db/schema';
import { User } from '@/db/types';

export const fetchCode = async (
  user: User,
): Promise<ChatCompletionMessageParam[]> => {
  const codes = await db.query.code
    .findMany({
      where: eq(code.authorId, user.id),
    })
    .then(
      codes =>
        /* Order and Return Mapped Codes to only include role and content */
        orderBy(codes, 'index', 'asc').map(({ role, content }) => ({
          role,
          content,
        })) as ChatCompletionMessageParam[],
    );

  return codes;
};
