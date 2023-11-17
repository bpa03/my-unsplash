'use client'
import {FC} from 'react'
import {Button} from '@chakra-ui/react'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {useForm} from 'react-hook-form'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Stack
} from '@chakra-ui/react'

const loginFormScheme = yup.object({
  email: yup
    .string()
    .email('Input provided must be an email')
    .required('Email is required'),
  password: yup.string().required('Password is required')
})

type LoginFormData = yup.InferType<typeof loginFormScheme>

interface LoginModalProps {
  onSubmit: (form: LoginFormData) => void;
  isOpen: boolean;
  onClose: () => void;
  loading: boolean;
}

const LoginModal: FC<LoginModalProps> = ({onSubmit, loading, isOpen, onClose}) => {
  const {
    register,
    formState: {errors},
    handleSubmit,
    reset
  } = useForm({
    resolver: yupResolver(loginFormScheme),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  return (
    <>
      <Modal isOpen={isOpen} onClose={() => {
        reset({email: '', password: ''})
        onClose()
      }} size="xl">
        <ModalOverlay />
        <ModalContent py={3.5}>
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={4}>
                <FormControl isInvalid={!!errors?.email?.message}>
                  <FormLabel fontSize="sm" color="primary.softDark">
                    Email
                  </FormLabel>
                  <Input type="text" {...register('email')} autoComplete="off" />
                  {!!errors.email?.message && (
                    <FormErrorMessage>{errors.email.message}</FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isInvalid={!!errors.password?.message}>
                  <FormLabel fontSize="sm" color="primary.softDark">
                    Password
                  </FormLabel>
                  <Input type="password" {...register('password')} />
                  {!!errors.password?.message && (
                    <FormErrorMessage>
                      {errors.password.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
              </Stack>
              <Button w="full" mt={4} type="submit" isLoading={loading}>
                Login
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default LoginModal
