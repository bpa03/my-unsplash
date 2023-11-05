import {type Request, type Response, type NextFunction} from 'express'

export abstract class Middleware {
  public abstract run (req: Request, res: Response, next: NextFunction): Promise<void>
}
