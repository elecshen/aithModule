import { JwtPayload } from 'jsonwebtoken'

export interface Playload extends JwtPayload {
	id?: number;
	email?: string;
}