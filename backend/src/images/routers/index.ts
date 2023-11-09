import {Router} from 'express'

import {ListOfImagesController} from '../controllers/list-of-images-controller'
import {VerifyTokenMiddleware} from '../../shared/middlewares/verify-token-middleware'

// Controllers
const listOfImagesController = new ListOfImagesController()

// Middlewares
const verifyTokenMiddleware = new VerifyTokenMiddleware()

const imagesRouter = Router()

imagesRouter.get('/', verifyTokenMiddleware.run, listOfImagesController.run.bind(listOfImagesController))

export default imagesRouter
