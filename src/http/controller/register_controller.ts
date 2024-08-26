
import { registerUseCase } from "@/use-cases/register";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function registerController(request: FastifyRequest, reply: FastifyReply) {

  console.log(request.body)
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email('Invalid email format'),
    roles: z.string().default('user'),
    password: z.string(),
  });

  const { name, email, password, roles } = registerBodySchema.parse(request.body);

  try {
    await registerUseCase({
      name,
      email,
      password,
      roles
    })
  } catch (err) {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}

