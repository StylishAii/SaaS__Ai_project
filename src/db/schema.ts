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
  conversations: many(conversation),
  code: many(code),
  imagePrompts: many(imagePrompt),
}));

export const conversation = pgTable('conversation', {
  id: serial('id').primaryKey(),
  authorId: integer('author_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  index: integer('index').notNull(),
  role: varchar('role', { length: 10 }).notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const conversationRelations = relations(conversation, ({ one }) => ({
  author: one(users, {
    fields: [conversation.authorId],
    references: [users.id],
  }),
}));

export const code = pgTable('code', {
  id: serial('id').primaryKey(),
  authorId: integer('author_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  index: integer('index').notNull(),
  role: varchar('role', { length: 10 }).notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const codeRelations = relations(code, ({ one }) => ({
  author: one(users, { fields: [code.authorId], references: [users.id] }),
}));

export const imagePrompt = pgTable('image_prompt', {
  id: serial('id').primaryKey(),
  authorId: integer('author_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  prompt: text('prompt').notNull(),
  amount: integer('amount').notNull(),
  resolution: varchar('resolution', { length: 10 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const imagePromptRelations = relations(imagePrompt, ({ one, many }) => ({
  author: one(users, {
    fields: [imagePrompt.authorId],
    references: [users.id],
  }),
  images: many(image),
}));

export const image = pgTable('image', {
  id: serial('id').primaryKey(),
  promptId: integer('prompt_id')
    .notNull()
    .references(() => imagePrompt.id, { onDelete: 'cascade' }),
  url: text('url').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const imageRelations = relations(image, ({ one }) => ({
  prompt: one(imagePrompt, {
    fields: [image.promptId],
    references: [imagePrompt.id],
  }),
}));
