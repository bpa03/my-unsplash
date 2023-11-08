import {Router} from 'express'

// Controllers
import {RegisterUserController} from '../controllers/register-user-controller'
import {LoginUserController} from '../controllers/login-user-controller'

const registerUserController = new RegisterUserController()
const loginUserController = new LoginUserController()

const usersRouter = Router()

usersRouter.post('/register', registerUserController.run.bind(registerUserController))
usersRouter.post('/login', loginUserController.run.bind(loginUserController))

export default usersRouter
