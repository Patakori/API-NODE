import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { RegisterUseCase } from "../register";

export function makeRegister() {
  const usersRepository = new PrismaUsersRepository()
  const registerUseCase = new RegisterUseCase(usersRepository)

  return registerUseCase
}
