import {type Request, type Response} from 'express'
import httpStatusCodes from 'http-status-codes'
import {type Controller} from '../../shared/interfaces/controller'
import {listOfImages} from '../services'

export class ListOfImagesController implements Controller {
  public async run (req: Request, res: Response): Promise<void> {
    const userId = req.user?.id
    const images = await listOfImages.exec(userId as string)
    res.status(httpStatusCodes.OK).json({data: {images}})
  }
}
