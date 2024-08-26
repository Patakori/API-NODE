import { FastifyInstance } from "fastify";
import { registerController } from "./controller/register_controller";

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', registerController)
}