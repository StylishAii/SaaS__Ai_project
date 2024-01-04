import { eq } from 'drizzle-orm';
import { orderBy } from 'lodash';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';

import { codeGenerationSetting } from '@/app/(routes)/code/data';

import { db } from '@/db';
import { users } from '@/db/schema';

export const fetchCode = async (
  userId: string,
): Promise<ChatCompletionMessageParam[]> => {
  'use server';

  const user = await db.query.users.findFirst({
    where: eq(users.userId, userId),
    with: { code: true },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const { code } = user;

  const modifiedCode =
    code.length === 0
      ? [codeGenerationSetting]
      : (orderBy(code, 'index', 'asc').map(({ role, content }) => ({
          role,
          content,
        })) as ChatCompletionMessageParam[]);

  return modifiedCode;
};
