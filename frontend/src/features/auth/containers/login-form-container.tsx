'use client'
import {FC, useState} from 'react'
import {signIn} from 'next-auth/react'
import {Modal, ModalOverlay, ModalContent, ModalBody, useToast} from '@chakra-ui/react'
import {LoginCredentials} from '../types'
import LoginForm from '../components/login-form'

interface LoginModalContainerProps {
  onClose: () => void
  isOpen: boolean
}

const LoginModalContainer: FC<LoginModalContainerProps> = ({
  isOpen,
  onClose
}) => {
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent py={3.5}>
        <ModalBody>
          <LoginForm
            loading={loading}
            onSubmit={({email, password}) => {
              const credentials: LoginCredentials = {email, password}
              setLoading(true)

              signIn('credentials', {
                ...credentials,
                redirect: false
              })
                .then((res) => {
                  if (res?.error) {
                    toast({
                      status: 'error',
                      size: 'sm',
                      title: res.error,
                      duration: 1500,
                      position: 'top-right'
                    })
                    return
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
                })
                .finally(() => {
                  setLoading(false)
                })
            }}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default LoginModalContainer
