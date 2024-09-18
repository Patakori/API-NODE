import { UsersRepository } from "@/repositories/users-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { User } from "@prisma/client";

interface GetUserProfileUseCaseRequest {
  userId: string
}

interface GetUserProfileUseCaseReponse {
  user: User
}

export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) { }

  async execute({ userId }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseReponse> {
    const user = await this.usersRepository.findByEmail(userId)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    return {
      user
    }

  }
}
