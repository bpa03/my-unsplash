import {Session} from 'next-auth'
import {getServerSession} from 'next-auth/next'
import {authOptions} from '../app/api/auth/[...nextauth]/route'

export async function getSession() {
  const session = getServerSession(authOptions) as unknown
  return session as Session
}
