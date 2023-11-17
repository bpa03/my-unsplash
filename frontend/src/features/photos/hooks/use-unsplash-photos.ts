import {useQuery, UseQueryOptions} from '@tanstack/react-query'
import {UnsplashPhoto} from '../types'
import {getPhotosFromUnsplash} from '../api/get-photos-from-unsplash'

type UseUnsplashPhotosOptions = {
  config?: Omit<UseQueryOptions<unknown, Error, UnsplashPhoto[]>, 'queryKey'>
}

export default function useUnsplashPhotos({config}: UseUnsplashPhotosOptions) {
  return useQuery({
    queryFn: () => getPhotosFromUnsplash(),
    staleTime: 0,
    queryKey: ['unsplash-photos'],
    ...config
  })
}
