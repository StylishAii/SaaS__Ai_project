import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';

import * as schema from '@/db/schema';

declare global {
  var drizzle: Client | undefined;
}

const createNewClient = () => {
  const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
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
