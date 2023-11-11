import type ImagesRepository from '../repositories/images-repository'
import {type Image} from '@prisma/client'

export class SaveImage {
  constructor (private readonly imagesRepository: ImagesRepository) {}

  public async exec ({userId, description, imageUrl}: { userId: string, description: string, imageUrl: string }): Promise<Image> {
    const image = await this.imagesRepository.save({description, imageUrl, userId})
    return image
  }
}
