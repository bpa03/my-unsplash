'use client'
import {FC, useState} from 'react'
import {signIn} from 'next-auth/react'
import {useToast} from '@chakra-ui/react'
import {LoginCredentials} from '../types'
import LoginModal from '../components/login-modal'

interface LoginModalContainerProps {
  onClose: () => void;
  isOpen: boolean;
}

const LoginModalContainer: FC<LoginModalContainerProps> = ({isOpen, onClose}) => {
  const [loading, setLoading] = useState(false)
  const toast = useToast()

 return (
   <LoginModal 
    isOpen={isOpen}
    onClose={onClose}
    loading={loading}
    onSubmit={({email, password}) => {
      const credentials: LoginCredentials = {email, password}
      setLoading(true)

      signIn('credentials', {
        ...credentials,
        redirect: false
      }).then((res) => {
        if (res?.error) {
          toast({
            status: 'error',
            size: 'sm',
            title: res.error,
            duration: 1500,
            position: 'top-right'
          })
        }

        onClose()
        toast({
          status: 'success',
          title: 'Welcome!',
          duration: 1500,
          position: 'bottom',
          containerStyle: {
            background: 'primary.green'
          }
        })
      }).finally(() => {
        setLoading(false)
      })
    }}
   />
 )
}

export default LoginModalContainer
