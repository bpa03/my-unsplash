import {useQuery, UseQueryOptions} from '@tanstack/react-query'
import {useSearchParams} from 'next/navigation'
import {useSession} from 'next-auth/react'
import getProfilePhotos from '../api/get-profile-photos'
import {ProfilePhotosDto} from '../types'

type UseProfilePhotosOptions = {
  config?: Omit<UseQueryOptions<unknown, Error, ProfilePhotosDto>, 'queryKey'>
}

export default function useProfilePhotos({config}: UseProfilePhotosOptions) {
  const searchParams = useSearchParams()
	const {data} = useSession()
  const query = searchParams.get('query') ?? ''

  return useQuery({
    queryFn: () => getProfilePhotos(data?.user?.access as string),
    staleTime: 0,
    queryKey: ['unsplash-photos', query],
		enabled: !!data?.user?.access,
    ...config
  })
}