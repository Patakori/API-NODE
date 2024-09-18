import { FastifyInstance } from "fastify";
import { registerController } from "./controller/register";
import { authenticateController } from "./controller/authenticate";
import { profile } from "./controller/profile";
import { verifyJWT } from "./middlewares/verify-jwt";

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', registerController)
  app.post('/sessions', authenticateController)

  /** Authenticated */
  app.post('/me', { onRequest: [verifyJWT] }, profile)
}
