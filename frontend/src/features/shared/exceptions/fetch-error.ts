export class FetchError extends Error {
  public status: number
  constructor (message: string, status: number) {
    super(message)
    this.stack = ''
    this.status = status
  }
}