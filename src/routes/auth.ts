import { FastifyInstance } from 'fastify';
import db from '../db/db';
import argon2 from 'argon2';
import { NewUser } from '../db/schema';

interface RegisterBody {
  name: string;
  surname: string;
  middlename?: string;
  email: string;
  username?: string;
  password: string;
}

interface LoginBody {
  username: string;
  password: string;
}

export async function authRoutes(fastify: FastifyInstance) {
  fastify.post<{ Body: RegisterBody }>('/register', async (request, reply) => {
    const hashedPassword = await argon2.hash(request.body.password);
	
	  const newUser: NewUser = { ...request.body, password: hashedPassword, is_confirmed: false };

    await db.insertInto('user').values(newUser).execute();

    reply.send({ status: 'ok' });
  });

  fastify.post<{ Body: LoginBody }>('/login', async (request, reply) => {
    const { username, password } = request.body;
    const user = await db.selectFrom('user').selectAll().where('username', '=', username).executeTakeFirst();

    if (!user || !await argon2.verify(user.password, password)) {
      return reply.status(401).send({ error: 'Invalid username or password' });
    }

    reply.send({ status: 'ok', userId: user.id });
  });
}