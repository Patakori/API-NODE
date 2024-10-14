import { User } from "../entities/user"
import { IUser } from "../interfaces/i-user"


export interface UsersRepository {
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  create(data: IUser): Promise<User>
}
