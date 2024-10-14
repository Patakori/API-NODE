
import { PrismaUsersRepository } from "@/infrastructure/repositories/prisma/prisma-users-repository";
import { AuthenticateUseCase } from "../use-cases/authenticate";

export function makeAuthenticate() {
  const usersRepository = new PrismaUsersRepository()
  const authenticateUseCase = new AuthenticateUseCase(usersRepository)

  return authenticateUseCase
}
