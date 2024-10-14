import { UsersRepository } from "@/domain/repositories/users-repository";

import { InvalidCredentialsError } from "../use-cases/errors/invalid-credentials-error";
import { User } from "@/domain/entities/user";

interface GetUserProfileUseCaseRequest {
  userId: string
}

interface GetUserProfileUseCaseReponse {
  user: User
}

export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) { }

  async execute({ userId }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseReponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    return {
      user
    }

  }
}
