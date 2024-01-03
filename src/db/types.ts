import { InferSelectModel } from 'drizzle-orm';

import { code, conversation, image, imagePrompt, users } from '@/db/schema';

export type User = InferSelectModel<typeof users>;

export type Conversation = InferSelectModel<typeof conversation>;

export type Code = InferSelectModel<typeof code>;

export type ImagePrompt = InferSelectModel<typeof imagePrompt>;

export type Image = InferSelectModel<typeof image>;

export type ImagePromptWithImages = InferSelectModel<typeof imagePrompt> & {
  images: Image[];
};
