import {PrismaClient} from '@prisma/client'
import UserRepository from './user-repository'

const prisma = new PrismaClient()

export const userRepository = new UserRepository(prisma.user)
