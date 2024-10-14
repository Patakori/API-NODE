import { UsersRepository } from "@/domain/repositories/users-repository"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error"
import bcrypt from "bcryptjs"
import { User } from "@/domain/entities/user"
import { IUser } from "@/domain/interfaces/i-user"
import { Role } from "@/domain/entities/role"

interface RegisterUseCaseRequest {
  name: string,
  email: string,
  password: string,
  role: Role
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

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const userProps: IUser = {
      name,
      email,
      passwordHash: password_hash,
      role: role as Role,
    };

    const user = new User(userProps);

    const createdUser = await this.usersRepository.create(user);

    return {
      user: createdUser
    }
  }
}

