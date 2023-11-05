import {type User, type Prisma} from '@prisma/client'
import {type UserRepositoryI} from '../interfaces/user-repository'

export default class UserRepository implements UserRepositoryI {
  constructor (private readonly userModel: Prisma.UserDelegate) {}

  public async createUser ({email, lastname, name, password}: { password: string, name: string, lastname: string, email: string }): Promise<User> {
    return await this.userModel.create({
      data: {
        email,
        password,
        name,
        lastname,
        gender: 'MALE'
      }
    })
  }
}
