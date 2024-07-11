import { Generated, Insertable, Selectable, Updateable } from "kysely";

export interface User {
  id: Generated<number>;
  name: string;
  surname: string;
  middlename?: string;
  email: string;
  username?: string;
  password: string;
  is_confirmed: boolean;
}

export type SelectedUser = Selectable<User>;
export type NewUser = Insertable<User>;
export type UserUpdate = Updateable<User>;

export interface Token {
  value: string;
  user_id: number;
  extra?: string;
}

export interface DB {
  user: User;
  token: Token;
}
