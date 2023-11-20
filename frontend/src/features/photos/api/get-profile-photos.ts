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
    throw new Error('Error on fetch profile photos')
  }

  const photos = await response.json()
  return photos
}