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

const savePhotoFormScheme = yup.object({
  imageUrl: yup.string().required(),
  description: yup.string().required('Description is required')
})

type SavePhotoFormData = yup.InferType<typeof savePhotoFormScheme>

interface SavePhotoFormProps {
  onSubmit: (form: SavePhotoFormData) => void
  loading: boolean
  imageUrl: string
}

const SavePhotoForm: FC<SavePhotoFormProps> = ({
  onSubmit,
  loading,
  imageUrl
}) => {
  const {
    register,
    formState: {errors},
    handleSubmit
  } = useForm({
    resolver: yupResolver(savePhotoFormScheme),
    defaultValues: {
      description: '',
      imageUrl
    }
  })

  return (
    <form
      onSubmit={handleSubmit((form) => {
        onSubmit(form)
      })}
      id="save-photo-form"
    >
      <Stack spacing={4}>
        <FormControl isInvalid={!!errors?.description?.message}>
          <FormLabel fontSize="sm" color="primary.softDark">
            Description
          </FormLabel>
          <Input
            type="text"
            {...register('description')}
            autoComplete="off"
            placeholder="Photo of my favorite team..."
          />
          {!!errors.description?.message && (
            <FormErrorMessage>{errors.description.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={!!errors.imageUrl?.message}>
          <FormLabel fontSize="sm" color="primary.softDark">
            URL
          </FormLabel>
          <Input type=".imageUrl" {...register('imageUrl')} disabled aria-disabled />
          {!!errors.imageUrl?.message && (
            <FormErrorMessage>{errors.imageUrl.message}</FormErrorMessage>
          )}
        </FormControl>
      </Stack>
      <Button w="full" mt={4} type="submit" isLoading={loading} aria-disabled={loading}>
        Save
      </Button>
    </form>
  )
}

export default SavePhotoForm
