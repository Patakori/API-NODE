
import { User } from "@/domain/entities/user";
import { IUser } from "@/domain/interfaces/i-user";
import { UsersRepository } from "@/domain/repositories/users-repository";
import { prisma } from "@/lib/prisma";
import { Prisma, Role } from "@prisma/client";


export class PrismaUsersRepository implements UsersRepository {
  async findById(id: string) {
    const prismaUser = await prisma.user.findUnique({
      where: {
        id
      },
      include: {
        UserProfiles: true  // Inclui o relacionamento UserProfiles
      }
    })

    if (prismaUser) {
      const user = new User({
        id: prismaUser.id,
        name: prismaUser.name,
        email: prismaUser.email,
        passwordHash: prismaUser.password_hash,
        role: prismaUser.role as Role,
        createdAt: prismaUser.created_at,
        updatedAt: prismaUser.updated_at,
        userProfiles: prismaUser.UserProfiles
      });
      return user
    }
    return null
  }

  async findByEmail(email: string) {
    const prismaUser = await prisma.user.findUnique({
      where: {
        email
      },
      include: {
        UserProfiles: true  // Inclui o relacionamento UserProfiles
      }
    })

    if (prismaUser) {
      const user = new User({
        id: prismaUser.id,
        name: prismaUser.name,
        email: prismaUser.email,
        passwordHash: prismaUser.password_hash,
        role: prismaUser.role as Role,
        createdAt: prismaUser.created_at,
        updatedAt: prismaUser.updated_at,
        userProfiles: prismaUser.UserProfiles
      });
      return user
    }

    return null
  }

  async create(data: IUser): Promise<User> {
    const prismaData: Prisma.UserCreateInput = {
      name: data.name,
      email: data.email,
      password_hash: data.passwordHash, // Mapeando para o formato do Prisma
      role: data.role as Role, // Também pode ser gerado automaticamente pelo Prisma
    };
    const createdPrismaUser = await prisma.user.create({
      data: prismaData
    })
    // Transformando o objeto retornado do Prisma em uma instância da classe User
    const user = new User({
      id: createdPrismaUser.id,
      name: createdPrismaUser.name,
      email: createdPrismaUser.email,
      passwordHash: createdPrismaUser.password_hash, // Mapeando de volta para o campo passwordHash
      role: createdPrismaUser.role,
      createdAt: createdPrismaUser.created_at,
      updatedAt: createdPrismaUser.updated_at,
    });
    return user
  }
}
