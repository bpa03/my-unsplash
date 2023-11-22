'use client'
import {FC} from 'react'
import {HStack, Spinner} from '@chakra-ui/react'
import ProfilePhoto from '../containers/profile-photo-container'
import ListOfPhotos from '../components/list-of-photos'
import useProfilePhotos from '../hooks/use-profile-photos'

interface ListOfProfilePhotosContainerProps {}

const ListOfProfilePhotosContainer: FC<ListOfProfilePhotosContainerProps> = () => {
	const {isLoading, data: photos} = useProfilePhotos({
		config: {
			refetchOnWindowFocus: false,
			refetchInterval: false
		}
	})

 return (
	<>
	{isLoading && (
		<HStack justifyContent="center" mt={24}>
			<Spinner color="primary.green" size="xl" />
		</HStack>
	)}
	{photos && Array.isArray(photos?.data.images) && (
		<ListOfPhotos>
			{photos.data.images.map(({id, imageUrl, description}) => (
				<ProfilePhoto
					key={id}
					description={description}
					id={id}
					alt="profile-photo.jpg"
					imageUrl={imageUrl}
				/>
			))}
		</ListOfPhotos>
	)}
</>
 )
}

export default ListOfProfilePhotosContainer
