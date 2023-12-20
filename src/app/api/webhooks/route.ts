import { WebhookEvent } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

import { db } from '@/db';
import { users } from '@/db/schema';

export const POST = async (req: Request) => {
  const event = (await req.json()) as WebhookEvent;

  switch (event.type) {
    case 'user.created': {
      const userId = event.data.id;
      const email = event.data.email_addresses[0].email_address;
      const firstName = event.data.first_name;
      const lastName = event.data.last_name;

      await db
        .insert(users)
        .values({
          userId,
          email,
          firstName,
          lastName,
        })
        .execute();

      break;
    }
    case 'user.deleted': {
      const userId = event.data.id!;

      await db.delete(users).where(eq(users.userId, userId)).execute();

      break;
    }
  }

  return NextResponse.json({ message: 'Webhook received' }, { status: 200 });
};
