import {useQuery, UseQueryOptions} from '@tanstack/react-query'
import {useSearchParams} from 'next/navigation'
import {searchPhotosFromUnsplash} from '../api/search-photos-from-unsplash'
import {SearchPhotosFromUnsplashDto} from '../types'

type UseSearchUnsplashPhotosOptions = {
  config?: Omit<UseQueryOptions<unknown, Error, SearchPhotosFromUnsplashDto>, 'queryKey'>
}

export default function useSearchUnsplashPhotos({config}: UseSearchUnsplashPhotosOptions) {
  const searchParams = useSearchParams()
  const query = searchParams.get('query') ?? ''

  return useQuery({
    queryFn: () => searchPhotosFromUnsplash(query),
    staleTime: 0,
    queryKey: ['unsplash-photos', query],
    ...config
  })
}