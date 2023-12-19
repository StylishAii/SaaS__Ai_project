import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';

import * as schema from '@/db/schema';

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect();

// Can only use db in server components
export const db = drizzle(client, { schema });
