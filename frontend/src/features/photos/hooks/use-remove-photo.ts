import {useSession} from 'next-auth/react'
import {useMutation, UseMutationOptions} from '@tanstack/react-query'
import removeProfilePhoto from '../api/remove-profile-photo'
import {FetchError} from '@/features/shared/exceptions/fetch-error'

type UseRemovePhotoOptions = {
  config?: UseMutationOptions<unknown, FetchError, string>;
}

export default function useRemovePhoto({config}: UseRemovePhotoOptions) {
  const {data: session} = useSession()

  return useMutation({
    mutationFn: (photoId) => removeProfilePhoto(session?.user.access as string, photoId),
    ...config
  })
}