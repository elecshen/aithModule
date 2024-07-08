import jwt, { Secret, SignOptions } from 'jsonwebtoken'
import { Playload } from '../models/playload.model'
import config from '../config'

const accessOpt: SignOptions = {
	expiresIn: config.jwt.accessExpiresIn,
}

const refreshOpt: SignOptions = {
	expiresIn: config.jwt.refreshExpiresIn,
}

function generateToken(playload: Playload, options: SignOptions) : string {
	return jwt.sign(playload, config.jwt.secret as Secret, options)
}

export function generate(playload: Playload) {
	return {
		accessToken: generateToken(playload, accessOpt),
		refreshToken: generateToken(playload, refreshOpt),
	}
}

export function verify(token: string) : Playload | string {
	try{
		const playload = jwt.verify(token, config.jwt.secret as Secret);
		return playload as Playload;
	} catch(err){
		if(err instanceof jwt.TokenExpiredError) {
			return 'Token has expired';
		} else if(err instanceof jwt.JsonWebTokenError) {
			return 'Invalid token';
		} else {
			return 'Token verification failed';
		}
	} 
}