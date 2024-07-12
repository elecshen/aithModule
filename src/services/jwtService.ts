import jwt, { Secret, SignOptions, JwtPayload } from "jsonwebtoken";
import config from "../config/config";

const accessOpt: SignOptions = {
  expiresIn: config.jwt.accessExpiresIn,
};

const refreshOpt: SignOptions = {
  expiresIn: config.jwt.refreshExpiresIn,
};

const confirmOpt: SignOptions = {
  expiresIn: config.jwt.refreshExpiresIn,
};

export enum TokenTypes {
  accessToken,
  refreshToken,
}

function generateToken(
  payload: JwtPayload,
  type: TokenTypes,
  options: SignOptions,
): string {
  payload.type = type;
  return jwt.sign(payload, config.jwt.secret as Secret, options);
}

export function generateAuth(payload: JwtPayload) {
  return {
    accessToken: generateToken(payload, TokenTypes.accessToken, accessOpt),
    refreshToken: generateToken(payload, TokenTypes.refreshToken, refreshOpt),
  };
}

export function verify(token: string): JwtPayload | string {
  try {
    return jwt.verify(token, config.jwt.secret as Secret);
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return "Token has expired";
    } else if (err instanceof jwt.JsonWebTokenError) {
      return "Invalid token";
    } else {
      return "Token verification failed";
    }
  }
}
