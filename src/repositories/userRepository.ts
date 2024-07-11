import db from "../config/db";
import { NewUser, SelectedUser } from "../models/schema";
import { RegisterBody } from "../dtos/register.dto";

export async function addUser(user: RegisterBody): Promise<SelectedUser> {
  const newUser: NewUser = { ...user, is_confirmed: false };
  return await db
    .insertInto("user")
    .values(newUser)
    .returningAll()
    .executeTakeFirstOrThrow();
}

export async function confirmUser(id: number) {
  return await db
    .updateTable("user")
    .set({ is_confirmed: true })
    .where("id", "=", id)
    .execute();
}

export async function updatePassword(id: number, password: string) {
  return await db
    .updateTable("user")
    .set({ password })
    .where("id", "=", id)
    .execute();
}

export async function getUser(
  email: string,
): Promise<SelectedUser | undefined> {
  return await db
    .selectFrom("user")
    .selectAll()
    .where("email", "=", email)
    .executeTakeFirst();
}
