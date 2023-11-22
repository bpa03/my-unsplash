import {FC} from 'react'
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
				queryClient.setQueryData(['profile-photos'], (old: ProfilePhotosDto) => ({
					data: {
						images: old.data.images.filter(({id}) => id !== imageId)
					}
				}))
				return previousPhotos
			},
			onError: (err, vars, ctx) => {
				toast({status: 'error', duration: 1500, title: 'Error on remove photo'})
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
