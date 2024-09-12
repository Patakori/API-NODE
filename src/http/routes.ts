import { FastifyInstance } from "fastify";
import { registerController } from "./controller/register";
import { authenticateController } from "./controller/authenticate";

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', registerController)
  app.post('/sessions', authenticateController)
}
