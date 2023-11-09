import {type JwtUserPayload} from '../src/users/interfaces/jwt-user-payload'

declare module 'express-serve-static-core' {
  interface Request {
    user?: JwtUserPayload
  }
}
