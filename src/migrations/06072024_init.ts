import { Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('user')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('name', 'varchar(255)', col => col.notNull())
    .addColumn('surname', 'varchar(255)', col => col.notNull())
    .addColumn('middlename', 'varchar(255)')
    .addColumn('email', 'varchar(255)', col => col.notNull().unique())
    .addColumn('username', 'varchar(15)')
    .addColumn('password', 'varchar', col => col.notNull())
    .addColumn('is_confirmed', 'boolean', col => col.notNull().defaultTo(false))
    .execute();
};

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('user').execute();
};