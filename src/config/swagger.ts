import { FastifyInstance } from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

export function setupSwagger(fastify: FastifyInstance) {
  fastify.register(fastifySwagger, {
    swagger: {
      info: {
        title: "Auth API",
        description: "API documentation for the authentication service",
        version: "1.0.0",
      },
      host: "localhost:3000",
      schemes: ["http"],
      consumes: ["application/json"],
      produces: ["application/json"],
      securityDefinitions: {
        bearerAuth: {
          type: "apiKey",
          name: "Authorization",
          in: "header",
        },
      },
    },
  });

  fastify.register(fastifySwaggerUi, {
    routePrefix: "/documentation",
  });
}
