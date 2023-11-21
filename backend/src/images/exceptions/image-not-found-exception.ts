export class ImageNotFoundException extends Error {
  public code: string
  constructor (message: string) {
    super(message)
    this.stack = ''
    this.name = 'ImageNotFoundException'
    this.code = 'image_not_found_error'
  }
}
