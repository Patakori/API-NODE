import { expect, describe, it, beforeEach } from "vitest"
import { RegisterUseCase } from "./register"
import { compare } from "bcryptjs"
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository"
import { UserAlredyExistsError } from "./errors/user-already-exists-error"

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
      roles: 'user'
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await registerUseCase.execute({
      name: 'John doe',
      email: 'johndoe@gmail.com',
      password: '123456',
      roles: 'user'
    })

    const isPAsswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash
    )

    expect(isPAsswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'johndoes@gmail.com'

    await registerUseCase.execute({
      name: 'John doe',
      email,
      password: '123456',
      roles: 'user'
    })

    expect(() => registerUseCase.execute({
      name: 'John doe',
      email,
      password: '123456',
      roles: 'user'
    })).rejects.toBeInstanceOf(UserAlredyExistsError)
  })

})
