import {type Request, type Response} from 'express'
import httpStatusCodes from 'http-status-codes'
import {type Controller} from '../../shared/interfaces/controller'
import {UserDupException} from '../exceptions/user-dup-exception'
import {registerUser} from '../services'

export class RegisterUserController implements Controller {
  public async run (req: Request, res: Response): Promise<void> {
    try {
      const {email, password, name, lastname} = req.body
      const user = await registerUser.exec({email, password, name, lastname})
      res.status(httpStatusCodes.CREATED).json({data: user})
    } catch (error) {
      if (error instanceof UserDupException) {
        res.status(httpStatusCodes.BAD_REQUEST).json({
          error: {
            code: error.code,
            message: error.message
          }
        })
      }
    }
  }
}
