import { relations } from 'drizzle-orm';
import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),
  email: text('email'),
  name: text('name'),
  about: text('about').default('').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const userRelations = relations(users, ({ many }) => ({
  messages: many(prompt),
}));

export const prompt = pgTable('prompt', {
  id: serial('id').primaryKey(),
  authorId: integer('author_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  index: integer('index').notNull(),
  role: varchar('prompt', { length: 10 }).notNull(),
  content: text('response').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
