import {UnsplashPhoto} from '../types'

export async function getPhotosFromUnsplash(): Promise<Array<UnsplashPhoto>> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_UNPLASH_API_URL}/photos?per_page=15`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNPLASH_ACCESS_KEY}`
    },
    method: 'GET'
  })

  if (!response.ok) {
    throw new Error('Error on fetch unsplash photos')
  }

  const photos = await response.json()
  return photos
}