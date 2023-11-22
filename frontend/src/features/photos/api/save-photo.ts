import {SavePhotoDto} from '../types'
import {FetchError} from '@/features/shared/exceptions/fetch-error'

export default async function savePhoto(token: string, photo: SavePhotoDto): Promise<unknown> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/images`, {
    headers: {
      Accept: 'application/json',
			'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    method: 'POST',
    body: JSON.stringify(photo)
  })

  if (!response.ok) {
    throw new FetchError('Error on save profile photo', response.status)
  }

  const photos = await response.json()
  return photos
}