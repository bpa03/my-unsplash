import {type Image} from '@prisma/client'

export abstract class ImageRepositoryI {
  public abstract findImagesByUserId (userId: string): Promise<Image[] | null>
}
