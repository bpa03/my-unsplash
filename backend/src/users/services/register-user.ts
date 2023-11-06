import {type User, Gender} from '@prisma/client'
import type UserRepository from '../repository/user-repository'
import encryptPassword from '../../shared/lib/encrypt-password'
import {UserDupException} from '../exceptions/user-dup-exception'

export class RegisterUser {
  constructor (private readonly userRepository: UserRepository) {}

  public async exec ({email, lastname, name, password}: { email: string, password: string, name: string, lastname: string }): Promise<User> {
    const userExists = await this.userRepository.findByEmail(email)

    if (userExists) {
      throw new UserDupException(`User with email ${email} already exists`)
    }

    const encryptedPassword = await encryptPassword(password)
    return await this.userRepository.createUser({
      password: encryptedPassword,
      email,
      name,
      lastname,
      gender: Gender.MALE
    })
  }
}
