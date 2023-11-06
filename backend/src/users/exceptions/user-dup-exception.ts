export class UserDupException extends Error {
  public code: string
  constructor (message: string) {
    super(message)
    this.stack = ''
    this.name = 'UserDupException'
    this.code = 'user_dup_error'
  }
}
