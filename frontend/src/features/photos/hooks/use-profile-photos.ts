import {useQuery, UseQueryOptions} from '@tanstack/react-query'
import {useSession} from 'next-auth/react'
import getProfilePhotos from '../api/get-profile-photos'
import {ProfilePhotosDto} from '../types'

type UseProfilePhotosOptions = {
  config?: Omit<UseQueryOptions<unknown, Error, ProfilePhotosDto>, 'queryKey'>
}

export default function useProfilePhotos({config}: UseProfilePhotosOptions) {
	const {data} = useSession()

  return useQuery({
    queryFn: () => getProfilePhotos(data?.user?.access as string),
    staleTime: 0,
    queryKey: ['profile-photos'],
		enabled: !!data?.user?.access,
    ...config
  })
}