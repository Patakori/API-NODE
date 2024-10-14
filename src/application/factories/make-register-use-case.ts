import { PrismaUsersRepository } from "@/infrastructure/repositories/prisma/prisma-users-repository";
import { RegisterUseCase } from "../use-cases/register";


export function makeRegister() {
  const usersRepository = new PrismaUsersRepository()
  const registerUseCase = new RegisterUseCase(usersRepository)

  return registerUseCase
}
