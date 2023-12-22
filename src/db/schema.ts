import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),
  email: text('email'),
  name: text('name'),
  about: text('about'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// export const conversation = pgTable('conversation', {
//   id: serial('id').primaryKey(),
//   userId: text('user_id').notNull(),
//   prompt: text('prompt').notNull(),
//   response: text('response').notNull(),
//   createdAt: timestamp('created_at').defaultNow().notNull(),
// });
