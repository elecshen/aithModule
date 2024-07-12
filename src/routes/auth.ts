import { FastifyInstance } from "fastify";
import {
  loginHandler,
  registerHandler,
  passwordReset,
  confirm,
  refresh,
} from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const registerSchema = {
  tags: ["Auth"],
  summary: "Register a new user",
  body: {
    type: "object",
    required: ["name", "surname", "email", "password"],
    properties: {
      name: { type: "string" },
      surname: { type: "string" },
      middlename: { type: "string" },
      email: { type: "string" },
      username: { type: "string" },
      password: { type: "string" },
    },
  },
  response: {
    200: {
      description: "User registered successfully",
      type: "object",
      properties: {
        id: { type: "string" },
      },
    },
    400: {
      description: "Bad request",
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  },
};

const loginSchema = {
  tags: ["Auth"],
  summary: "Login a user",
  body: {
    type: "object",
    required: ["email", "password"],
    properties: {
      email: { type: "string" },
      password: { type: "string" },
    },
  },
  response: {
    200: {
      description: "User logged in successfully",
      type: "object",
      properties: {
        accessToken: { type: "string" },
        refreshToken: { type: "string" },
      },
    },
    400: {
      description: "Invalid username or password",
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  },
};

const refreshSchema = {
  tags: ["Auth"],
  summary: "Refresh a user's token",
  body: {
    type: "object",
    properties: {
      refreshToken: { type: "string" },
    },
    required: ["refreshToken"],
  },
  response: {
    200: {
      description: "User's token refreshed successfully",
      type: "object",
      properties: {
        accessToken: { type: "string" },
        refreshToken: { type: "string" },
      },
    },
    400: {
      description: "Invalid token",
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  },
  security: [{ bearerAuth: [] }],
};

const confirmSchema = {
  tags: ["Auth"],
  summary: "Confirm user's action",
  querystring: {
    type: "object",
    properties: {
      token: { type: "string" },
    },
    required: ["token"],
  },
  response: {
    200: {
      description: "Confirmed successfully",
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
    400: {
      description: "Invalid token",
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  },
};

const resetPasswordSchema = {
  tags: ["Auth"],
  summary: "Reset user's password",
  body: {
    type: "object",
    required: ["password", "newPassword"],
    properties: {
      password: { type: "string" },
      newPassword: { type: "string" },
    },
  },
  response: {
    200: {
      description: "Password reset email sent",
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
    400: {
      description: "Bad request",
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  },
  security: [{ bearerAuth: [] }],
};

export async function authRoutes(fastify: FastifyInstance) {
  fastify.post("/register", { schema: registerSchema }, registerHandler);
  fastify.post("/login", { schema: loginSchema }, loginHandler);
  fastify.post(
    "/refresh",
    { preHandler: [authMiddleware], schema: refreshSchema },
    refresh,
  );
  fastify.get("/confirm", { schema: confirmSchema }, confirm);
  fastify.post(
    "/reset_pass",
    { preHandler: [authMiddleware], schema: resetPasswordSchema },
    passwordReset,
  );
}
