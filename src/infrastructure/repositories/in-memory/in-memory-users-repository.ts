import { User } from "@/domain/entities/user";
import { IUser } from "@/domain/interfaces/i-user";
import { UsersRepository } from "@/domain/repositories/users-repository";



export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findById(id: string): Promise<User | null> {
    const user = this.items.find(item => item.id === id)

    if (!user) {
      return null
    }
    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find(item => item.email === email)

    if (!user) {
      return null
    }
    return user
  }

  async create(data: IUser): Promise<User> {
    const user = new User({
      id: data.id || 'user-1',
      name: data.name,
      email: data.email,
      passwordHash: data.passwordHash,
      role: data.role,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.items.push(user)

    return user
  }
}
