import { InferSelectModel } from 'drizzle-orm';

import { conversation, users } from '@/db/schema';

export type User = InferSelectModel<typeof users>;

export type Conversation = InferSelectModel<typeof conversation>;
