import 'dotenv/config';

import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

const db = drizzle(pool);

const main = async () => {
  console.log('Migration started');
  await migrate(db, { migrationsFolder: './drizzle' });
  console.log('Migration finished');
  process.exit(0);
};

main().catch(err => {
  console.log(err);
  process.exit(0);
});
