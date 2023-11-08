export class UnregisteredUserException extends Error {
  public code: string
  constructor (message: string) {
    super(message)
    this.stack = ''
    this.name = 'UnregisteredUserException'
    this.code = 'unregistered_user_error'
  }
}
