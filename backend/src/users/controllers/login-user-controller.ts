import {type Request, type Response} from 'express'
import httpStatusCodes from 'http-status-codes'
import {UnregisteredUserException} from '../exceptions/unregisted-user-exception'
import {BadCredentialsException} from '../exceptions/bad-credentials-exception'
import {type Controller} from '../../shared/interfaces/controller'
import {loginUser} from '../services'

export class LoginUserController implements Controller {
  public async run (req: Request, res: Response): Promise<void> {
    try {
      const {email, password} = req.body
      const jwt = await loginUser.exec({email, password})
      res.status(httpStatusCodes.CREATED).json({
        data: {
          access: jwt
        }
      })
    } catch (error) {
      if (error instanceof UnregisteredUserException || error instanceof BadCredentialsException) {
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
