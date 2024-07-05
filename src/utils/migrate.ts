import { promises as fs } from 'fs';
import { Migrator, FileMigrationProvider } from 'kysely';
import db from '../db/db';
import path from 'path';

const migrator = new Migrator({
  db,
  provider: new FileMigrationProvider({
    fs: fs,
    path: path,
    migrationFolder: path.join(__dirname, '../migrations')
  })
});

async function migrateToLatest() {
  const { error, results } = await migrator.migrateToLatest();
  results?.forEach((it) => {
    if (it.status === 'Success') {
      console.log(`Migration ${it.migrationName} executed successfully`);
    } else if (it.status === 'Error') {
      console.error(`Failed to execute migration ${it.migrationName}`);
    }
  });
  if (error) {
    console.error('Failed to migrate', error);
    process.exit(1);
  }
  process.exit(0);
}

migrateToLatest();