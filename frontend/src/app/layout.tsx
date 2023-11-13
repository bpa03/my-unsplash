import type {Metadata} from 'next'
import {Noto_Sans} from 'next/font/google'

// Providers
import {ChakraUiProvider} from '@/providers/chakra-ui'
import {ReactQueryProvider} from '@/providers/react-query'
import {NextAuthProvider} from '@/providers/next-auth'

const notoSans = Noto_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  fallback: ['system-ui'],
  preload: true
})

export const metadata: Metadata = {
  title: 'My Unplash'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={notoSans.className}>
        <NextAuthProvider>
          <ReactQueryProvider>
            <ChakraUiProvider>{children}</ChakraUiProvider>
          </ReactQueryProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}
