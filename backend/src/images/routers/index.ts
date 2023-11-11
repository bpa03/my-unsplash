import {Router} from 'express'

import {ListOfImagesController} from '../controllers/list-of-images-controller'
import {VerifyTokenMiddleware} from '../../shared/middlewares/verify-token-middleware'
import {SaveImageController} from '../controllers/save-image-controller'

// Controllers
const listOfImagesController = new ListOfImagesController()
const saveImageController = new SaveImageController()

// Middlewares
const verifyTokenMiddleware = new VerifyTokenMiddleware()

const imagesRouter = Router()

imagesRouter.get('/', verifyTokenMiddleware.run, listOfImagesController.run.bind(listOfImagesController))
imagesRouter.post('/', verifyTokenMiddleware.run, saveImageController.run.bind(saveImageController))

export default imagesRouter
