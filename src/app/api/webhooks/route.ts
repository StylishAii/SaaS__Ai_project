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
      const name = `${event.data.first_name} ${event.data.last_name}`;

      await db
        .insert(users)
        .values({
          userId,
          email,
          name,
        })
        .execute();

      break;
    }
    case 'user.updated': {
      const userId = event.data.id;
      const email = event.data.email_addresses[0].email_address;
      const name = `${event.data.first_name} ${event.data.last_name}`;

      await db
        .update(users)
        .set({
          email,
          name,
        })
        .where(eq(users.userId, userId))
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
