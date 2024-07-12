import argon2 from "argon2";
import { RegisterBody } from "../dtos/register.dto";
import * as userRepository from "../repositories/userRepository";
import * as tokenRepository from "../repositories/tokenRepository";
import * as jwtService from "./jwtService";
import { LoginBody } from "../dtos/login.dto";
import * as mailService from "./mail.service";
import { randomBytes } from "crypto";
import { Token } from "../models/schema";
import { PassResetBody } from "../dtos/passReset.dto";
import { JwtPayload } from "jsonwebtoken";

function generateToken(length: number = 32): string {
  return randomBytes(length).toString("hex");
}

export async function register(user: RegisterBody) {
  const existed = await userRepository.getUser(user.email);
  if (existed) {
    return -1;
  }

  user.password = await argon2.hash(user.password);
  const result = await userRepository.addUser(user);

  const token: Token = {
    value: generateToken(127),
    user_id: result.id,
  };
  await tokenRepository.addToken(token);

  await mailService.sendRegConfirm(result.email, token.value);
  return result.id;
}

export async function login(user: LoginBody) {
  const existed = await userRepository.getUser(user.email);
  if (!existed || !(await argon2.verify(existed.password, user.password))) {
    return { message: "Invalid username or password" };
  }
  if (!existed.is_confirmed) {
    return { message: "Confirm your email first" };
  }
  const payload = {
    id: existed.id,
    email: existed.email,
  };
  return jwtService.generateAuth(payload);
}

export async function refreshToken(token: string) {
  const decoded = jwtService.verify(token);
  if (typeof decoded === "string") {
    return decoded;
  } else if (decoded.type !== jwtService.TokenTypes.refreshToken) {
    return "Invalid token";
  } else {
    const payload = {
      id: decoded.id,
      email: decoded.email,
    };
    return jwtService.generateAuth(payload);
  }
}

export async function resetPassword(pass: PassResetBody, userInfo: JwtPayload) {
  const existed = await userRepository.getUser(userInfo.email);
  if (!existed || !(await argon2.verify(existed.password, pass.password))) {
    return "Invalid password";
  }
  const token: Token = {
    value: generateToken(127),
    user_id: existed.id,
    extra: await argon2.hash(pass.newPassword),
  };
  await tokenRepository.addToken(token);
  await mailService.sendPassResetConfirm(userInfo.email, token.value);
}

export async function confirm(token: string) {
  const result = await tokenRepository.getToken(token);
  if (!result) {
    return "Invalid token";
  }
  if (!result.extra) {
    await userRepository.confirmUser(result.user_id);
  } else {
    await userRepository.updatePassword(result.user_id, result.extra);
  }
  await tokenRepository.deleteToken(result.user_id);
}
