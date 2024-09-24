import fastify from 'fastify';
import { appRoutes } from './http/routes';
import { ZodError } from 'zod';
import { env } from './env';
import fastifyJwt from '@fastify/jwt';
import fastifyCookie from "@fastify/cookie";

export const app = fastify();
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: false
  },
  sign: {
    expiresIn: '10m'
  }
})
app.register(fastifyCookie)

app.register(appRoutes)

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    //Aqui deveria ser utilizada uma ferramenta de log, como datadog.
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
