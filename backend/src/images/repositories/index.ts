import {prisma} from '../../../prisma/client'
import ImagesRepository from './images-repository'

export const imagesRepository = new ImagesRepository(prisma.image)
