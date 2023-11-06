import {prisma} from '../../../prisma/client'
import UserRepository from './user-repository'

export const userRepository = new UserRepository(prisma.user)
