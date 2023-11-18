'use client'
import {FC} from 'react'
import {HStack, Spinner} from '@chakra-ui/react'
import ListOfPhotos from '../components/list-of-photos'
import UnsplashPhoto from '../components/unsplash-photo'
import useSearchUnsplashPhotos from '../hooks/use-search-unsplash-photos'

const ListOfSearchedUnsplashPhotos: FC<object> = () => {
  const {data: photos, isLoading} = useSearchUnsplashPhotos({
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
      {photos && Array.isArray(photos?.results) && (
        <ListOfPhotos>
          {photos.results.map(({id, urls: {regular}}) => (
            <UnsplashPhoto
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

export default ListOfSearchedUnsplashPhotos
