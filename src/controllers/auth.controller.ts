import * as authService from "../services/authService";
import { FastifyReply, FastifyRequest } from "fastify";
import { LoginBody } from "../dtos/login.dto";
import { RegisterBody } from "../dtos/register.dto";
import { validateRegisterDto, validateLoginDto, validatePassResetDto } from '../validators/dtoValidators';
import { PassResetBody } from "../dtos/passReset.dto";

export async function registerHandler(request: FastifyRequest<{ Body: RegisterBody }>, reply:FastifyReply) {
	const validationResponse = validateRegisterDto(request.body);
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
	const validationResponse = validateLoginDto(request.body);
	if(validationResponse !== true) {
		return reply.status(400).send(validationResponse);
	}

  const tokens = await authService.login(request.body)
	if(!tokens) {
		reply.status(400).send({ message: "Invalid username or password" });
	} else {
		reply.send({ ...tokens });
	}
}

export async function passwordReset(request: FastifyRequest<{ Body: PassResetBody }>, reply:FastifyReply) {
	const validationResponse = validatePassResetDto(request.body);
	if(validationResponse !== true) {
		return reply.status(400).send(validationResponse);
	}

	const result = await authService.resetPassword(request.body, request.user);
	if(typeof result === 'string') {
		reply.status(400).send({ message: result });
	} else {
		reply.send({ message: "Check your email" });
	}
}

export async function confirm(request: FastifyRequest<{ Querystring: { token: string }}>, reply:FastifyReply) {
	const token = request.query.token;
	const result = await authService.confirm(token);
	if(typeof result === 'string') {
		reply.status(400).send({ message: result });
	} else {
		reply.send({ message: "Confirmed" });
	}
}