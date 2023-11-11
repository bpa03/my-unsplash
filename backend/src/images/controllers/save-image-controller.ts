import {type Request, type Response} from 'express'
import httpStatusCodes from 'http-status-codes'
import {type Controller} from '../../shared/interfaces/controller'
import {saveImage} from '../services'

export class SaveImageController implements Controller {
  public async run (req: Request, res: Response): Promise<void> {
    const {description, imageUrl} = req.body
    const userId = req.user?.id as string

    const image = await saveImage.exec({description, imageUrl, userId})
    res.status(httpStatusCodes.CREATED).json({image})
  }
}
