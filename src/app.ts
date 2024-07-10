import Fastify from 'fastify';
import { authRoutes } from './routes/auth';
import { setupSwagger } from './config/swagger';

const fastify = Fastify({ logger: true });

setupSwagger(fastify);
fastify.register(authRoutes, { prefix: '/auth' });

fastify.listen({ port:3000 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.swagger();
  fastify.log.info(`Server listening at ${address}`);
});