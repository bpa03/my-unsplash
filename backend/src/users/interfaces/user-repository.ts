import {type User, type Gender} from '@prisma/client'

export abstract class UserRepositoryI {
  public abstract findByEmail (email: string): Promise<User | null>
  public abstract createUser (args: { password: string, name: string, lastname: string, email: string, gender: Gender }): Promise<User>
}
