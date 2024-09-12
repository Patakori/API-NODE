import { prisma } from "@/lib/prisma"
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { UsersRepository } from "@/repositories/users-repository"
import { hash } from "bcryptjs"
import { UserAlredyExistsError } from "./errors/user-already-exists-error"
import { User } from "@prisma/client"

interface RegisterUseCaseRequest {
  name: string,
  email: string,
  password: string,
  roles: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) { }

  async execute({ email, name, password, roles }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlredyExistsError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
      roles
    })

    return {
      user
    }
  }
}

