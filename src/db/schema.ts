import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable
} from 'kysely';

export interface UserT {
	id: Generated<number>;
	username: string;
	password: string;
}

export type User = Selectable<UserT>;
export type NewUser = Insertable<UserT>;
export type UserUpdate = Updateable<UserT>;

export interface DB {
  user: UserT;
}