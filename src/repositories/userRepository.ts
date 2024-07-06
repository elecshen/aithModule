import db from "../config/db";
import { NewUser, SelectedUser } from "../db/schema";
import { RegisterBody } from "../dtos/registerBody";

export async function addUser(user:RegisterBody) : Promise<SelectedUser> {
	const newUser: NewUser = { ...user, is_confirmed: false };
	return await db
		.insertInto('user')
		.values(newUser)
		.returningAll()
		.executeTakeFirstOrThrow();
}

export async function getUser(email:string) : Promise<SelectedUser | undefined> {
	return await db
		.selectFrom('user')
		.selectAll()
		.where('email', '=', email)
		.executeTakeFirst();
}