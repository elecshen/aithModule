import argon2 from 'argon2';
import { RegisterBody } from "../dtos/registerBody";
import * as userRepository from "../repositories/userRepository";
import { LoginBody } from '../dtos/loginBody';

export async function register(user:RegisterBody) {
	const existed = await userRepository.getUser(user.email);
	if(existed) {
		return -1;
	}

	user.password = await argon2.hash(user.password);
	const result = await userRepository.addUser(user);

	return result.id;
}

export async function login(user:LoginBody) {
	const existed = await userRepository.getUser(user.email);
	if(!existed || !await argon2.verify(existed.password, user.password)) {
		return;
	}

	return existed.id;
}