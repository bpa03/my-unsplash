import {SearchPhotosFromUnsplashDto} from '../types'

export async function searchPhotosFromUnsplash(query: string): Promise<Array<SearchPhotosFromUnsplashDto>> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_UNPLASH_API_URL}/search/photos?query=${query}`, {
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