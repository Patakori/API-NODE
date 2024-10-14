import { expect, describe, it, beforeEach } from "vitest"
import { RegisterUseCase } from "./register"
import bcrypt from "bcryptjs"

import { UserAlreadyExistsError } from "./errors/user-already-exists-error"
import { InMemoryUsersRepository } from "@/infrastructure/repositories/in-memory/in-memory-users-repository"

let usersRepository = new InMemoryUsersRepository()
let registerUseCase = new RegisterUseCase(usersRepository)

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    registerUseCase = new RegisterUseCase(usersRepository)
  })
  it('should be able to register', async () => {
    const { user } = await registerUseCase.execute({
      name: 'John doe',
      email: 'johndoe@gmail.com',
      password: '123456',
      role: 'MEMBER'
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await registerUseCase.execute({
      name: 'John doe',
      email: 'johndoe@gmail.com',
      password: '123456',
      role: 'MEMBER'
    })

    const isPAsswordCorrectlyHashed = await bcrypt.compare(
      '123456',
      user.passwordHash
    )

    expect(isPAsswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'johndoes@gmail.com'

    await registerUseCase.execute({
      name: 'John doe',
      email,
      password: '123456',
      role: 'MEMBER'
    })

    expect(() => registerUseCase.execute({
      name: 'John doe',
      email,
      password: '123456',
      role: 'MEMBER'
    })).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

})
