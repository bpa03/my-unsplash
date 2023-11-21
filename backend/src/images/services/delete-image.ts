import {ImageNotFoundException} from '../exceptions/image-not-found-exception'
import type ImagesRepository from '../repositories/images-repository'

export class DeleteImage {
  constructor (private readonly imagesRepository: ImagesRepository) {}

  public async exec (imageId: string, userId: string): Promise<void> {
    const image = await this.imagesRepository.findImageById({imageId, userId})

    if (!image) {
      throw new ImageNotFoundException(`Image with id ${imageId} doesn't exist`)
    }

    await this.imagesRepository.delete({imageId})
  }
}
