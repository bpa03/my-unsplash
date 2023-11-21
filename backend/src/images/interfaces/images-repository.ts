import {type Image} from '@prisma/client'

export abstract class ImageRepositoryI {
  public abstract findImageById ({imageId, userId}: { imageId: string, userId: string }): Promise<Image | null>
  public abstract findImagesByUserId (userId: string): Promise<Image[] | null>
  public abstract save ({userId, description, imageUrl}: { userId: string, description: string, imageUrl: string }): Promise<Image>
  public abstract delete ({imageId}: { imageId: string }): Promise<void>
}
