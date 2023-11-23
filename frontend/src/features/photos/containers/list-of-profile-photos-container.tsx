'use client'
import {FC} from 'react'
import {HStack, Spinner, Icon, Box} from '@chakra-ui/react'
import ProfilePhoto from '../containers/profile-photo-container'
import ListOfPhotos from '../components/list-of-photos'
import useProfilePhotos from '../hooks/use-profile-photos'
import {IoMdClose} from 'react-icons/io'

interface ListOfProfilePhotosContainerProps {}

const ListOfProfilePhotosContainer: FC<ListOfProfilePhotosContainerProps> = () => {
  const {isLoading, data: photos,error} = useProfilePhotos({
    config: {
      refetchOnWindowFocus: false,
      refetchInterval: false
    }
  })

  return (
    <>
      {isLoading && (
        <HStack
          justifyContent="center"
          mt={24}
        >
          <Spinner
            color="primary.green"
            size="xl"
          />
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
      {error && (
        <Box
          border="1px solid"
          borderColor="red.500"
          p={32}
          mx="auto"
          mt={12}
          display="flex"
          justifyContent="center"
          rounded="xl"
          w="fit-content"
        >
          <Box as="span">
            <Icon
              as={IoMdClose}
              color="red.500"
              w={20}
              h={20}
            />
          </Box>
        </Box>
      )}
    </>
  )
}

export default ListOfProfilePhotosContainer
