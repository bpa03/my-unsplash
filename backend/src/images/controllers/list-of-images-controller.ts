import {type Request, type Response} from 'express'
import httpStatusCodes from 'http-status-codes'
import {type Controller} from '../../shared/interfaces/controller'

export class ListOfImagesController implements Controller {
  public async run (req: Request, res: Response): Promise<void> {
    console.log(req.user)
    res.status(httpStatusCodes.OK).json({
      data: {
        images: [
          {
            imageUrl: 'https://plus.unsplash.com/premium_photo-1698952282280-c1fb6443092c?q=80&w=1384&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            label: 'super image label'
          }
        ]
      }
    })
  }
}
