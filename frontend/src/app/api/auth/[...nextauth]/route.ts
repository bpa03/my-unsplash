import NextAuth from 'next-auth/next'
import type {NextAuthOptions} from 'next-auth'

export const authOptions: NextAuthOptions = {
  providers: [],
  callbacks: {
    jwt: ({token}) => {
      return token
    },
    session: ({session}) => {
      return {...session}
    }
  },
  session: {},
  jwt: {},
  pages: {
    signIn: '/sign-in'
  }
}

const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}
