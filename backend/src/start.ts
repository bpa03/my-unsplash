import {Server} from './server'

try {
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  new Server().listen()
} catch (e) {
  console.log(e)
  process.exit(1)
}

process.on('uncaughtException', err => {
  console.log('uncaughtException', err)
  process.exit(1)
})
