import {useEffect} from 'react'
import {useQuery, UseQueryOptions} from '@tanstack/react-query'
import {useSession, signOut} from 'next-auth/react'
import getProfilePhotos from '../api/get-profile-photos'
import {ProfilePhotosDto} from '../types'
import {FetchError} from '@/features/shared/exceptions/fetch-error'
import {useUnauthorizedModal} from '@/features/auth/components/unauthorized-modal'

type UseProfilePhotosOptions = {
  config?: Omit<UseQueryOptions<unknown, FetchError, ProfilePhotosDto>, 'queryKey'>
}

export default function useProfilePhotos({config}: UseProfilePhotosOptions) {
  const {data} = useSession()
  const {openModal} = useUnauthorizedModal()
  const query = useQuery({
    queryFn: () => getProfilePhotos(data?.user?.access as string),
    staleTime: 0,
    queryKey: ['profile-photos'],
    enabled: !!data?.user?.access,
    retry: (failureCount, error) => error.status !== 401 && error.status !== 404,
    ...config
  })

  useEffect(() => {
    if (query.error?.status === 401) {
      openModal(() => {
        setTimeout(() => signOut({redirect: true}), 1500)
      })
    }
  }, [query.error, openModal])

  return query
}