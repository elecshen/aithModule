import { FastifyInstance } from 'fastify';
import { loginHandler, registerHandler, passwordReset, confirm } from '../controllers/auth.controller';
import { authMiddleware } from '../middleware/auth.middleware';

export async function authRoutes(fastify: FastifyInstance) {
  fastify.post('/register', registerHandler);

  fastify.post('/login', loginHandler);

  fastify.get('/confirm', confirm);

  fastify.post('/reset_pass', {preHandler: [authMiddleware]}, passwordReset)
}