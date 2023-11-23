import {FC} from 'react'
import {signOut} from 'next-auth/react'
import ProfilePhoto from '../components/profile-photo'
import useRemovePhoto from '../hooks/use-remove-photo'
import {useToast} from '@chakra-ui/react'
import {useQueryClient} from '@tanstack/react-query'
import {ProfilePhotosDto} from '../types'

interface ProfilePhotoContainerProps {
  imageUrl: string
  description: string
  alt: string
  id: string
}

const ProfilePhotoContainer: FC<ProfilePhotoContainerProps> = ({alt, description, id, imageUrl}) => {
  const toast = useToast()
  const queryClient = useQueryClient()
  const {mutate, isPending} = useRemovePhoto({
    config: {
      onMutate: async (imageId) => {
        await queryClient.cancelQueries({queryKey: ['profile-photos']})
        const previousPhotos = queryClient.getQueryData(['profile-photos'])
        queryClient.setQueryData(
          ['profile-photos'],
          (old: ProfilePhotosDto) => ({
            data: {
              images: old.data.images.filter(({id}) => id !== imageId)
            }
          })
        )
        return previousPhotos
      },
      onError: (err, vars, ctx) => {
        switch (err.status) {
          case 401: {
            toast({
              status: 'error',
              duration: 1500,
              title: 'The session has expired. Please login',
              containerStyle: {
                bgColor: 'red.500'
              }
            })
            signOut({redirect: true})
            break
          }
          default: {
            toast({
              status: 'error',
              duration: 1500,
              title: 'Unknown error on save photo. We are working to solve the problem'
            })
          }
        }
        queryClient.setQueryData(['profile-photos'], ctx)
      },
      onSettled: () => {
        queryClient.invalidateQueries({queryKey: ['profile-photos']})
      }
    }
  })

  const handleRemovePhoto = () => mutate(id)

  return (
    <ProfilePhoto
      alt={alt}
      imageUrl={imageUrl}
      description={description}
      isRemoving={isPending}
      onRemove={handleRemovePhoto}
    />
  )
}

export default ProfilePhotoContainer
