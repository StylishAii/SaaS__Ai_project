'use server';

import { auth } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { users } from '@/db/schema';
import { redirect } from 'next/navigation';

export const fetchUser = async () => {
  const { userId } = auth();

  if (!userId) redirect('/');

  const user = await db.query.users.findFirst({
    where: eq(users.userId, userId),
  });

  if (!user) redirect('/');

  console.log({ about: user.about });

  return user;
};
