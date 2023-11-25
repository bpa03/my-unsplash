'use client'
import {FC} from 'react'
import {Button} from '@chakra-ui/react'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {useForm} from 'react-hook-form'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Stack
} from '@chakra-ui/react'

const loginFormScheme = yup.object({
  email: yup
    .string()
    .email('Email provided is invalid')
    .required('Email is required'),
  password: yup.string().required('Password is required')
})

type LoginFormData = yup.InferType<typeof loginFormScheme>

interface LoginFormProps {
  onSubmit: (form: LoginFormData) => void;
  loading: boolean;
}

const LoginForm: FC<LoginFormProps> = ({onSubmit, loading}) => {
  const {
    register,
    formState: {errors},
    handleSubmit
  } = useForm({
    resolver: yupResolver(loginFormScheme),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  return (
    <form onSubmit={handleSubmit(({email, password}) => onSubmit({email, password}))}>
      <Stack spacing={4}>
        <FormControl isInvalid={!!errors?.email?.message}>
          <FormLabel fontSize="sm" color="primary.softDark">
                    Email
          </FormLabel>
          <Input type="text" {...register('email')} autoComplete="off" placeholder="example@emil.com" />
          {!!errors.email?.message && (
            <FormErrorMessage>{errors.email.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={!!errors.password?.message}>
          <FormLabel fontSize="sm" color="primary.softDark">
              Password
          </FormLabel>
          <Input type="password" {...register('password')} placeholder="12345678" />
          {!!errors.password?.message && (
            <FormErrorMessage>
              {errors.password.message}
            </FormErrorMessage>
          )}
        </FormControl>
      </Stack>
      <Button w="full" mt={4} type="submit" isLoading={loading} aria-disabled={loading} aria-label="login">
        Login
      </Button>
    </form>
  )
}

export default LoginForm
