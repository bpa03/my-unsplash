import {FetchError} from '@/features/shared/exceptions/fetch-error'
import {ProfilePhotosDto} from '../types'

export default async function getProfilePhotos(token: string): Promise<ProfilePhotosDto> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/images`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    },
    method: 'GET'
  })

  if (!response.ok) {
    throw new FetchError('Fetch error on get profile photos', response.status)
  }

  const photos = await response.json()
  return photos
}