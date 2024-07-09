import { FastifyInstance } from 'fastify';
import { loginHandler, registerHandler, confirm } from '../controllers/auth.controller';

export async function authRoutes(fastify: FastifyInstance) {
  fastify.post('/register', registerHandler);

  fastify.post('/login', loginHandler);

  fastify.get('/confirm', confirm);
}