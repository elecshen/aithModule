import * as authService from "../services/authService";
import { FastifyReply, FastifyRequest } from "fastify";
import { LoginBody } from "../dtos/loginBody";
import { RegisterBody } from "../dtos/registerBody";
import { validateRegisterDto, validateLoginDto } from '../validators/dtoValidators';

export async function registerHandler(request: FastifyRequest<{ Body: RegisterBody }>, reply:FastifyReply) {
	const validationResponse  = validateRegisterDto(request.body);
	if(validationResponse !== true) {
		return reply.status(400).send(validationResponse);
	}
	
	const id = await authService.register(request.body)
	if(id === -1) {
		reply.status(400).send({ message: "User already exists" });
	} else {
		reply.send({ id });
	}
}

export async function loginHandler(request: FastifyRequest<{ Body: LoginBody }>, reply:FastifyReply) {
	const validationResponse  = validateLoginDto(request.body);
	if(validationResponse !== true) {
		return reply.status(400).send(validationResponse);
	}

  const id = await authService.login(request.body)
	if(!id) {
		reply.status(400).send({ message: "Invalid username or password" });
	} else {
		reply.send({ id });
	}
}