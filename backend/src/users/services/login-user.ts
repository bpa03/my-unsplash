import type UserRepository from '../repository/user-repository'
import {UnregisteredUserException} from '../exceptions/unregisted-user-exception'
import {BadCredentialsException} from '../exceptions/bad-credentials-exception'
import generateJwt from '../../shared/lib/generate-jwt'
import compareEncryptedPassword from '../../shared/lib/compare-encrypted-password'

export class LoginUser {
  constructor (private readonly userRepository: UserRepository) {}

  public async exec ({email, password}: { email: string, password: string }): Promise<string> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new UnregisteredUserException(`The user with email ${email} is not registered`)
    }

    const {password: userPassword} = user
    const same = await compareEncryptedPassword(password, userPassword)

    if (!same) {
      throw new BadCredentialsException('Wrong email or password')
    }

    const {gender, name, lastname, email: userEmail, id} = user
    const payload = {gender, name, lastname, email: userEmail, id}
    return await generateJwt(payload)
  }
}
