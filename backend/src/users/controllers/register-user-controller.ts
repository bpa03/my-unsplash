import {type Request, type Response} from 'express'
import httpStatusCodes from 'http-status-codes'
import {type Controller} from '../../shared/interfaces/controller'
import {registerUser} from '../services'

export class RegisterUserController implements Controller {
  public async run (req: Request, res: Response): Promise<void> {
    const {email, password, name, lastname} = req.body
    const user = await registerUser.exec({email, password, name, lastname})

    if (user.id) {
      res.status(httpStatusCodes.CREATED).json({data: {user}})
    }
  }
}
