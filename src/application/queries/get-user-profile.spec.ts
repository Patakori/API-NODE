import { expect, describe, it, beforeEach } from "vitest"

import bcrypt from "bcryptjs"
import { GetUserProfileUseCase } from "./get-user-profile"

import { InMemoryUsersRepository } from "@/infrastructure/repositories/in-memory/in-memory-users-repository"
import { ResourceNotFoundErrors } from "../use-cases/errors/resource-not-found-errors"
import { InvalidCredentialsError } from "../use-cases/errors/invalid-credentials-error"

let usersRepository = new InMemoryUsersRepository()
let sut = new GetUserProfileUseCase(usersRepository)

describe('Get User Profile Use Case', () => {

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })

  it('should be able to get user profile', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      passwordHash: await bcrypt.hash('123456', 6),
      role: "MEMBER"
    })

    if (createdUser.id) {
      const { user } = await sut.execute({
        userId: createdUser.id
      })
      expect(user.name).toBe('John Doe')
    }
  })

  it('should not be able to get user profile with wrong id', async () => {
    expect(sut.execute({
      userId: 'non-existing-id'
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
