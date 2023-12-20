import { pgTable, serial, text } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),
  email: text('email'),
  firstName: text('first_name'),
  lastName: text('last_name'),
});
