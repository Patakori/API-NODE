import { PrismaUsersRepository } from "@/infrastructure/repositories/prisma/prisma-users-repository";
import { GetUserProfileUseCase } from "../queries/get-user-profile";


export function makeGetUserProfile() {
  const usersRepository = new PrismaUsersRepository()
  const authenticateUseCase = new GetUserProfileUseCase(usersRepository)

  return authenticateUseCase
}
