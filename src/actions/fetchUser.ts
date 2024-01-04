import { auth } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';

import { db } from '@/db';
import { users } from '@/db/schema';

export const fetchUser = async () => {
  'use server';

  const { userId } = auth();

  if (!userId) redirect('/');

  const user = await db.query.users.findFirst({
    where: eq(users.userId, userId),
  });

  if (!user) redirect('/');

  return user;
};
