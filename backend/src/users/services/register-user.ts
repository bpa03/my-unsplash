import {type User} from '@prisma/client'
import type UserRepository from '../repository/user-repository'
import bcrypt from 'bcrypt'

export class RegisterUser {
  constructor (private readonly userRepository: UserRepository) {}

  public async exec ({email, lastname, name, password}: { email: string, password: string, name: string, lastname: string }): Promise<User> {
    const salt = await bcrypt.genSalt(15)
    const encryptedPassword = await bcrypt.hash(password, salt)

    const newUser = await this.userRepository.createUser({
      password: encryptedPassword,
      email,
      lastname,
      name
    })

    return newUser
  }
}
