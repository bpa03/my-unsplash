export class BadCredentialsException extends Error {
  public code: string
  constructor (message: string) {
    super(message)
    this.stack = ''
    this.name = 'UnregisteredUserException'
    this.code = 'bad_credentials_error'
  }
}
