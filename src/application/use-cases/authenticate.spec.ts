import { expect, describe, it, beforeEach } from "vitest"

import { AuthenticateUseCase } from "./authenticate"
import bcrypt from "bcryptjs"
import { InvalidCredentialsError } from "./errors/invalid-credentials-error"
import { InMemoryUsersRepository } from "@/infrastructure/repositories/in-memory/in-memory-users-repository"

let usersRepository = new InMemoryUsersRepository()
let sut = new AuthenticateUseCase(usersRepository)

describe('Authenticate Use Case', () => {

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      passwordHash: await bcrypt.hash('123456', 6),
      role: "MEMBER"
    })

    const { user } = await sut.execute({
      email: 'johndoe@gmail.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    expect(() => sut.execute({
      email: 'johndoe@gmail.com',
      password: '123456',
    })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      passwordHash: await bcrypt.hash('123456', 6),
      role: "MEMBER"
    })

    expect(() => sut.execute({
      email: 'johndoe@gmail.com',
      password: '456123',
    })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

})
