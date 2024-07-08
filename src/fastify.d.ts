import { Playload } from "./models/playload.model";

declare module 'fastify' {
	interface FastifyRequest {
		user: Playload
	}
}