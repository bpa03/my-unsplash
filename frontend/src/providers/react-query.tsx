'use client'
import {FC, useState, ReactNode} from 'react'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

interface ReactQueryProviderProps {
  children: ReactNode
}

export const ReactQueryProvider: FC<ReactQueryProviderProps> = ({children}) => {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {}
    })
  )

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
