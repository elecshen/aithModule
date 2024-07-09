import db from "../config/db";
import { Token } from "../models/schema";


export async function addToken(token: Token) {
	return await db
		.insertInto('token')
		.values(token)
		.execute();
}

export async function getToken(token: string) : Promise<Token | undefined> {
	return await db
		.selectFrom('token')
		.selectAll()
		.where('value', '=', token)
		.executeTakeFirst();
}

export async function deleteToken(user_id: number) {
	return await db
		.deleteFrom('token')
		.where('user_id', '=', user_id)
		.execute();
}