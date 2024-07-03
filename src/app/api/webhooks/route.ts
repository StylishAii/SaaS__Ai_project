import { WebhookEvent } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { Webhook } from 'svix';

import { db } from '@/db';
import { users } from '@/db/schema';

export const POST = async (req: Request) => {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env');
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);
  let event: WebhookEvent;

  // Verify the payload with the headers
  try {
    event = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400,
    });
  }

  // Event Type
  const eventType = event.type;

  // Handle the event for type users
  switch (eventType) {
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
