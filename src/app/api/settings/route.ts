import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

import { db } from '@/db';
import { users } from '@/db/schema';

interface SettingsRequest {
  name: string;
  about: string;
}

export const POST = async (req: Request) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await req.json();
    const { name, about }: SettingsRequest = body;

    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }

    const user = await db
      .update(users)
      .set({
        name,
        about,
      })
      .where(eq(users.userId, userId))
      .returning();

    return NextResponse.json(user, { status: 200 });
  } catch (err: any) {
    console.log('SETTINGS_ERROR:', err);
    return new NextResponse('Internal Error', { status: 500 });
  }
};
