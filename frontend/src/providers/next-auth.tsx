'use client'

import {FC, PropsWithChildren} from 'react'
import {SessionProvider} from 'next-auth/react'

interface NextAuthProps {}

export const NextAuthProvider: FC<PropsWithChildren<NextAuthProps>> = ({
  children
}) => {
  return <SessionProvider>{children}</SessionProvider>
}
