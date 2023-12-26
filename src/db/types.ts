import { InferSelectModel } from 'drizzle-orm';

import { code, conversation, users } from '@/db/schema';

export type User = InferSelectModel<typeof users>;

export type Conversation = InferSelectModel<typeof conversation>;

export type Code = InferSelectModel<typeof code>;
