import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { users } from '@/db/schema';
import { ImagePromptWithImages } from '@/db/types';

export const fetchImages = async (
  userId: string,
): Promise<ImagePromptWithImages[]> => {
  'use server';

  const user = await db.query.users.findFirst({
    where: eq(users.userId, userId),
    with: { imagePrompts: { with: { images: true } } },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const { imagePrompts } = user;

  return imagePrompts;
};
