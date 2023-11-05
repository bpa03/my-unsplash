import {userRepository} from '../repository'
import {RegisterUser} from './register-user'

export const registerUser = new RegisterUser(userRepository)
