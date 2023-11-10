import {type Image, type Prisma} from '@prisma/client'
import {type ImageRepositoryI} from '../interfaces/images-repository'

export default class ImagesRepository implements ImageRepositoryI {
  constructor (private readonly imagesModel: Prisma.ImageDelegate) {}

  public async findImagesByUserId (userId: string): Promise<Image[]> {
    return await this.imagesModel.findMany({
      where: {
        userId
      }
    })
  }
}
