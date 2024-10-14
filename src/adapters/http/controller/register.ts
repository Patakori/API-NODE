import { makeRegister } from "@/application/factories/make-register-use-case";
import { UserAlreadyExistsError } from "@/application/use-cases/errors/user-already-exists-error";
import { Role } from "@/domain/entities/role";

import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function registerController(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email('Invalid email format'),
    role: z.string().default('MEMBER'),
    password: z.string(),
  });

  const { name, email, password, role } = registerBodySchema.parse(request.body);

  try {
    const registerUseCase = makeRegister()

    await registerUseCase.execute({
      name,
      email,
      password,
      role: role as Role
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }
    throw err
  }

  return reply.status(201).send()
}

