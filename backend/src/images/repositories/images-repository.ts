import {type Image, type Prisma} from '@prisma/client'
import {type ImageRepositoryI} from '../interfaces/images-repository'

export default class ImagesRepository implements ImageRepositoryI {
  constructor (private readonly imagesModel: Prisma.ImageDelegate) {}

  public async findImageById ({imageId, userId}: { imageId: string, userId: string }): Promise<Image | null> {
    return await this.imagesModel.findFirst({
      where: {
        userId,
        id: imageId
      }
    })
  }

  public async delete ({imageId}: { imageId: string }): Promise<void> {
    await this.imagesModel.delete({
      where: {
        id: imageId
      }
    })
  }

  public async findImagesByUserId (userId: string): Promise<Image[]> {
    return await this.imagesModel.findMany({
      where: {
        userId
      }
    })
  }

  public async save ({userId, description, imageUrl}: { userId: string, description: string, imageUrl: string }): Promise<Image> {
    return await this.imagesModel.create({
      data: {
        userId,
        imageUrl,
        description
      }
    })
  }
}
