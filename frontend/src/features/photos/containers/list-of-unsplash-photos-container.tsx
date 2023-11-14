'use client'
import {FC} from 'react'
import {Image} from '@chakra-ui/react'
import useUnsplashPhotos from '../hooks/use-unsplash-photos'
import ListOfPhotos from '../components/list-of-photos'

const ListOfUnsplashPhotos: FC<object> = () => {
  const {data: photos, isLoading} = useUnsplashPhotos({
    config: {
      refetchInterval: false,
      refetchOnWindowFocus: false
    }
  })

  return (
    <>
      {isLoading && <h1>Loading photos...</h1>}
      {photos && Array.isArray(photos) && (
        <ListOfPhotos>
          {photos.map(({id, urls: {full}}) => (
            <Image
              src={full}
              alt="unsplash-photos"
              width="100%"
              key={id}
              rounded="16px"
            />
          ))}
        </ListOfPhotos>
      )}
    </>
  )
}

export default ListOfUnsplashPhotos
