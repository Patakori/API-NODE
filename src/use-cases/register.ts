
import { UsersRepository } from "@/repositories/users-repository"

import { UserAlreadyExistsError } from "./errors/user-already-exists-error"
import { Role, User } from "@prisma/client"
import bcrypt from "bcryptjs"

interface RegisterUseCaseRequest {
  name: string,
  email: string,
  password: string,
  role: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) { }

  async execute({ email, name, password, role }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await bcrypt.hash(password, 6)

    if (role !== 'ADMIN' && role !== 'MEMBER') {
      throw new Error('Invalid role');
    }
    const prismaRole = role as Role;
    console.log("prismaRole", prismaRole)
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
      role: prismaRole
    })

    return {
      user
    }
  }
}

