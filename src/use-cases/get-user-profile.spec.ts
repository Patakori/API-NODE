import { expect, describe, it, beforeEach } from "vitest"
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository"
import bcrypt from "bcryptjs"
import { GetUserProfileUseCase } from "./get-user-profile"
import { ResourceeNotFoundErrors } from "./errors/resource-not-found-errors"

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
      password_hash: await bcrypt.hash('123456', 6)
    })

    const { user } = await sut.execute({
      userId: createdUser.id
    })

    expect(user.name).toEqual(expect.any('John Doe'))
  })

  it('should not be able to get user profile with wrong id', async () => {

    expect(() => {
      sut.execute({
        userId: 'non-existing-id'
      })
    }).rejects.toBeInstanceOf(ResourceeNotFoundErrors)
  })
})
