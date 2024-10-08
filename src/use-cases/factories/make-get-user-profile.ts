import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { GetUserProfileUseCase } from "../get-user-profile";

export function makeGetUserProfile() {
  const usersRepository = new PrismaUsersRepository()
  const authenticateUseCase = new GetUserProfileUseCase(usersRepository)

  return authenticateUseCase
}
