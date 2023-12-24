import { InferSelectModel } from 'drizzle-orm';

import { prompt, users } from '@/db/schema';

export type User = InferSelectModel<typeof users>;

export type Prompt = InferSelectModel<typeof prompt>;
