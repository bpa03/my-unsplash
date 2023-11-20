import {useSession} from 'next-auth/react'
import {useMutation, UseMutationOptions} from '@tanstack/react-query'
import savePhoto from '../api/save-photo'
import {SavePhotoDto} from '../types'

type UseSavePhotoOptions = {
  config?: UseMutationOptions<unknown, Error, SavePhotoDto>;
}

export default function useSavePhoto({config}: UseSavePhotoOptions) {
  const {data: session} = useSession()

  return useMutation({
    mutationFn: (photo) => savePhoto(session?.user.access as string, photo),
    ...config
  })
}