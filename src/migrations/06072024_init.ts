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

  await db.schema
    .createTable('token')
    .addColumn('value', 'varchar(255)', (col) => col.primaryKey())
    .addColumn('user_id', 'integer', (col) => col.notNull().references('user.id'))
    .addColumn('extra', 'varchar')
    .execute();
};



export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('token').execute();
  await db.schema.dropTable('user').execute();
};