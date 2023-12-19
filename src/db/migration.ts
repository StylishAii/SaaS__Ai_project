import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

const main = async () => {
  console.log('Migration started');
  await migrate(db, { migrationsFolder: 'drizzle' });
  console.log('Migration finished');
  process.exit(0);
};

main().catch(err => {
  console.log(err);
  process.exit(0);
});
