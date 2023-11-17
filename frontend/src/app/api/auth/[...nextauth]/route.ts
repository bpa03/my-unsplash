import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import type {NextAuthOptions} from 'next-auth'
import login from '@/features/auth/api/login'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Auth with email and password',
      credentials: {
        email: {type: 'email'},
        password: {type: 'password'}
      },
      authorize: async (credentials) => {
        try {
          const email = credentials?.email ?? ''
          const password = credentials?.password ?? ''
          const user = await login({email, password})
          const token = user.data.access
          return {
            id: token,
            email: 'bpa@gmail.com',
            name: 'Baldassare Pugliese',
            access: token
          }  
        } catch (error) {
          throw error
        }      
      }
    })
  ],
  callbacks: {
    jwt: ({token, user}) => {
      const isLogged = !!user

      if (isLogged) {
        token.id = user.id
        token.access = user.access 
        token.email = user.email
      }

      return token
    },
    session: ({session, token}) => {
      if (!!token) {
        session.user.access = token.access
        session.user.id = token.id
        session.user.email = token.email ?? ''
      }
      return {...session}
    }
  },
  secret: process.env.NEXT_AUTH_SECRET_KEY,
  pages: {
    signIn: '/sign-in'
  }
}

const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}
