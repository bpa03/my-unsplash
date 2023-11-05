import {type User} from '@prisma/client'

export abstract class UserRepositoryI {
  public abstract createUser (args: { password: string, name: string, lastname: string, email: string }): Promise<User>
}
