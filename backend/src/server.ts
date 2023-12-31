import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import type * as http from 'http'
import {prisma} from '../prisma/client'

// Routes
import usersRouter from './users/routers'
import imagesRouter from './images/routers'

export class Server {
  private server!: http.Server
  private readonly express = express()

  constructor () {
    this.express = express()
    this.express.set('port', process.env.PORT ?? 8080)

    // Middlewares
    this.express.use(express.json())
    this.express.use(express.urlencoded({extended: true}))
    this.express.use(cors({credentials: true, origin: '*'}))
    if (process.env.NODE_ENV === 'development') this.express.use(morgan('dev'))

    // Routes
    this.express.use('/auth', usersRouter)
    this.express.use('/images', imagesRouter)
  }

  get getServer (): http.Server {
    return this.server
  }

  async listen (): Promise<void> {
    await new Promise<void>((resolve) => {
      prisma.$connect().then(() => {
        this.server = this.express.listen(this.express.get('port'), () => {
          console.log('Application running on http://localhost:' + this.express.get('port'))
          resolve()
        })
      }).catch((err) => {
        console.log('Error on connect to database: ', err)
      })
    })
  }

  async stop (): Promise<void> {
    await new Promise<void>((resolve, reject) => {
      if (this.server) {
        this.server.close(error => {
          if (error !== null) {
            reject(error); return
          }
          resolve()
        })
      }
      resolve()
    })
  }
}
