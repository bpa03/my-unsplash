import {Router} from 'express'

// Controllers
import {RegisterUserController} from '../controllers/register-user-controller'

const registerUserController = new RegisterUserController()

const usersRouter = Router()

usersRouter.post('/register', registerUserController.run.bind(registerUserController))

export default usersRouter
