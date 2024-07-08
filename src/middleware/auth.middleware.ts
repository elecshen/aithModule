import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from "fastify";
import { verify } from "../services/jwtService";

export const authMiddleware = (request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) => {
	const token = request.headers.authorization?.split(" ")[1];

	if(!token) {
		reply.status(401).send({message: 'Authorization token missing'});
		return;
	}
	const decoded = verify(token);
	if(typeof decoded === 'string') {
		reply.status(401).send({message: decoded});
	} else {
		request.user = decoded;
		done();
	}
}