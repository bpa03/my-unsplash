import {type Request, type Response} from 'express'
import httpStatusCodes from 'http-status-codes'
import {type Controller} from '../../shared/interfaces/controller'
import {deleteImage} from '../services'
import {ImageNotFoundException} from '../exceptions/image-not-found-exception'

export class DeleteImageController implements Controller {
  public async run (req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id as string
      const imageId = req.params.id
      await deleteImage.exec(imageId, userId)
      res.status(httpStatusCodes.NO_CONTENT).json()
    } catch (error) {
      if (error instanceof ImageNotFoundException) {
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
