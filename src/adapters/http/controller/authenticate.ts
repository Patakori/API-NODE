import { makeAuthenticate } from "@/application/factories/make-authenticate-use-case";
import { InvalidCredentialsError } from "@/application/use-cases/errors/invalid-credentials-error";

import { FastifyReply, FastifyRequest } from "fastify";

import { z } from "zod";

export async function authenticateController(request: FastifyRequest, reply: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string(),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const authenticateUseCase = makeAuthenticate()
    const { user } = await authenticateUseCase.execute({
      email,
      password,
    })

    const token = await reply.jwtSign({
      role: user.role
    }, {
      sign: {
        sub: user.id
      }
    })

    const refreshToken = await reply.jwtSign({
      role: user.role
    }, {
      sign: {
        sub: user.id,
        expiresIn: '7d'
      }
    })

    console.log(token)

    return reply
      .setCookie("refreshToken", refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true
      })
      .status(200)
      .send({
        token
      })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }
    throw err
  }
}

