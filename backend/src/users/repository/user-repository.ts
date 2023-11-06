import {type User, type Prisma, type Gender} from '@prisma/client'
import {type UserRepositoryI} from '../interfaces/user-repository'

export default class UserRepository implements UserRepositoryI {
  constructor (private readonly userModel: Prisma.UserDelegate) {}

  public async findByEmail (email: string): Promise<User | null> {
    return await this.userModel.findUnique({
      where: {
        email
      }
    })
  }

  public async createUser ({email, lastname, name, password}: { password: string, name: string, lastname: string, email: string, gender: Gender }): Promise<User> {
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
