import argon2 from 'argon2';
import { RegisterBody } from "../dtos/registerBody";
import * as userRepository from "../repositories/userRepository";
import * as tokenRepository from "../repositories/tokenRepository";
import * as jwtService from "./jwtService";
import { LoginBody } from '../dtos/loginBody';
import { sendRegConfirm } from './mail.service';
import { randomBytes } from 'crypto';
import { Token } from '../models/schema';

function generateToken(length: number = 32): string {
  return randomBytes(length).toString('hex');
}

export async function register(user:RegisterBody) {
	const existed = await userRepository.getUser(user.email);
	if(existed) {
		return -1;
	}

	user.password = await argon2.hash(user.password);
	const result = await userRepository.addUser(user);

	const token: Token = {
		value: generateToken(127),
		user_id: result.id,
	}
	await tokenRepository.addToken(token);

	await sendRegConfirm(result.email, token.value);
	return result.id;
}

export async function login(user:LoginBody) {
	const existed = await userRepository.getUser(user.email);
	if(!existed || !await argon2.verify(existed.password, user.password)) {
		return;
	}
	if(!existed.is_confirmed) {
		return { message: 'Confirm your email first'};
	}
	const playload = {
		id: existed.id,
		email: existed.email,
	}
	return jwtService.generateAuth(playload);
}

export async function confirm(token:string) {
	const result = await tokenRepository.getToken(token);
	if(!result) {
		return 'Invalid token';
	}
	await userRepository.confirmUser(result.user_id);
	await tokenRepository.deleteToken(result.user_id);
}