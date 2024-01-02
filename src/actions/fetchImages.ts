import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { users } from '@/db/schema';
import { Image } from '@/db/types';

export const fetchImages = async (userId: string): Promise<Image[]> => {
  'use server';

  const user = await db.query.users.findFirst({
    where: eq(users.userId, userId),
    with: { images: true },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const { images } = user;

  return images;
};
