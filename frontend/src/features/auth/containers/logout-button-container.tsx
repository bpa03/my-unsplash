'use client'
import {FC, useState} from 'react'
import {signOut} from 'next-auth/react'
import {Button, useToast} from '@chakra-ui/react'

interface LogoutButtonContainerProps {}

const LogoutButtonContainer: FC<LogoutButtonContainerProps> = () => {
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const handleLogout = () => {
    setLoading(true)
    signOut({redirect: true, callbackUrl: '/'})
      .then(() =>
        toast({
          title: 'See you later ;)',
          status: 'success',
          containerStyle: {
            background: 'primary.green'
          }
        })
      )
      .finally(() => setLoading(false))
  }

  return (
    <Button onClick={handleLogout} bg="red.500" isLoading={loading}>
      Logout
    </Button>
  )
}

export default LogoutButtonContainer
