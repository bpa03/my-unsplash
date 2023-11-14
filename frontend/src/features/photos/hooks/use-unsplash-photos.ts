import {useQuery, UseQueryOptions} from '@tanstack/react-query'
import {getPhotosFromUnsplash} from '../api/get-photos-from-unsplash'
import {UnsplashPhoto} from '../types'

type UseUnsplashPhotosOptions = {
  config?: Omit<UseQueryOptions<unknown, Error, Array<UnsplashPhoto>>, 'queryKey'>
}

export default function useUnsplashPhotos({config}: UseUnsplashPhotosOptions) {
  return useQuery({
    queryFn: () => getPhotosFromUnsplash(),
    staleTime: 0,
    queryKey: ['unsplash-photos'],
    ...config
  })
}
