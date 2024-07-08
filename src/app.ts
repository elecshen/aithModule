import Fastify from 'fastify';
import { authRoutes } from './routes/auth';
import { authMiddleware } from './middleware/auth.middleware';

const fastify = Fastify({ logger: true });

fastify.register(authRoutes, { prefix: '/auth' });
fastify.decorate('auth', authMiddleware);

const start = async () => {
  try {
    await fastify.listen({port: 3000});
    fastify.log.info(`Server listening on http://localhost:3000`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();