import {type Request, type Response, type NextFunction} from 'express'
import httpStatusCode from 'http-status-codes'
import {Middleware} from '../interfaces/middleware'
import verifyJwt from '../lib/verify-jwt'
import {type JwtUserPayload} from '../../users/interfaces/jwt-user-payload'

export class VerifyTokenMiddleware extends Middleware {
  public async run (req: Request, res: Response, next: NextFunction): Promise<void> {
    const authorization = req.header('Authorization') as string
    const token = authorization?.split(' ').at(1)

    if (!token) {
      res.status(httpStatusCode.UNAUTHORIZED).json({
        error: {
          code: 'missing_token',
          message: 'Must provide a token'
        }
      })
      return
    }

    const user = await verifyJwt(token) as JwtUserPayload

    if (!user?.id) {
      res.status(httpStatusCode.UNAUTHORIZED).json({
        error: {
          code: 'invalid_token',
          message: 'The token is invalid'
        }
      })
      return
    }

    req.user = user
    next()
  }
}
