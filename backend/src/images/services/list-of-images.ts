import type ImagesRepository from '../repositories/images-repository'
import {type Image} from '@prisma/client'

export class ListOfImages {
  constructor (private readonly imagesRepository: ImagesRepository) {}

  public async exec (userId: string): Promise<Image[]> {
    const images = await this.imagesRepository.findImagesByUserId(userId)
    return images
  }
}
