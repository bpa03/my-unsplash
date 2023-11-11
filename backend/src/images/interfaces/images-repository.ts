import {type Image} from '@prisma/client'

export abstract class ImageRepositoryI {
  public abstract findImagesByUserId (userId: string): Promise<Image[] | null>
  public abstract save ({userId, description, imageUrl}: { userId: string, description: string, imageUrl: string }): Promise<Image>
}
