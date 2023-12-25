import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';

import * as schema from '@/db/schema';

declare global {
  var drizzle: Client | undefined;
}

const createNewClient = () => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  client.connect();
  return client;
};

const client = globalThis.drizzle ? globalThis.drizzle : createNewClient();

if (process.env.NODE_ENV === 'development') {
  globalThis.drizzle = client;
}

// Can only use db in server components
export const db = drizzle(client, { schema });
