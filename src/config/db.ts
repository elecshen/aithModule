import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import { DB } from '../db/schema';
import config from '../config';

const pgDialect = new PostgresDialect({
    pool: new Pool(config.db)
  });

const db = new Kysely<DB>({
  dialect: pgDialect
});

export default db;