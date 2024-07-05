import Fastify from 'fastify';
import { authRoutes } from './routes/auth';

const fastify = Fastify({ logger: true });

fastify.register(authRoutes, { prefix: '/auth' });

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