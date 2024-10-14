import { FastifyInstance } from "fastify";
import { registerController } from "./controller/register";
import { authenticateController } from "./controller/authenticate";
import { profile } from "./controller/profile";
import { verifyJWT } from "./middlewares/verify-jwt";
import { refresh } from "./controller/refresh";
import { verifyUserRole } from "./middlewares/verify-user-role";

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', registerController)
  app.post('/sessions', authenticateController)

  app.patch('/token/refresh', refresh)

  /** Authenticated */
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}


// pra usar verificação de role nas rotas exemplo: onRequest: [verifyUserRole('admin')]
