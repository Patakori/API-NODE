import { expect, describe, it } from "vitest"
import { RegisterUseCase } from "./register"
import { compare } from "bcryptjs"
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository"
import { UserAlredyExistsError } from "./errors/user-already-exists-error"

describe('Register Use Case', () => {
  it('should be able to register', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
      name: 'John doe',
      email: 'johndoe@gmail.com',
      password: '123456',
      roles: 'user'
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

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
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

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
