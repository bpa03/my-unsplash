'use client'
import {FC} from 'react'
import {HStack, Spinner} from '@chakra-ui/react'
import useUnsplashPhotos from '../hooks/use-unsplash-photos'
import ListOfPhotos from '../components/list-of-photos'
import Photo from '../components/photo'

const ListOfUnsplashPhotos: FC<object> = () => {
  const {data: photos, isLoading} = useUnsplashPhotos({
    config: {
      refetchInterval: false,
      refetchOnWindowFocus: false
    }
  })

  return (
    <>
      {isLoading && (
        <HStack justifyContent="center" mt={24}>
          <Spinner color="primary.green" size="xl" />
        </HStack>
      )}
      {photos && Array.isArray(photos) && (
        <ListOfPhotos>
          {photos.map(({id, urls: {regular}}) => (
            <Photo
              key={id}
              alt="unsplash-image"
              src={regular}
            />
          ))}
        </ListOfPhotos>
      )}
    </>
  )
}

export default ListOfUnsplashPhotos
