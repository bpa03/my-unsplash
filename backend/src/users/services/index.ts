import {userRepository} from '../repository'
import {RegisterUser} from './register-user'
import {LoginUser} from './login-user'

export const registerUser = new RegisterUser(userRepository)
export const loginUser = new LoginUser(userRepository)
