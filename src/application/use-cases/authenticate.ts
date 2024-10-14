import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import bcrypt from "bcryptjs";
import { UsersRepository } from "@/domain/repositories/users-repository";
import { User } from "@/domain/entities/user";

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseReponse {
  user: User
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) { }

  async execute({ email, password }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseReponse> {
    const foundUser = await this.usersRepository.findByEmail(email)

    if (!foundUser) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await bcrypt.compare(password, foundUser.passwordHash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    const user = new User(foundUser);

    return {
      user
    }

  }
}
