import {http, HttpResponse} from 'msw'
import {v4 as uuid} from 'uuid'
import {SavePhotoDto} from '@/features/photos/types'

export const apiHandlers = [
  http.post('http://localhost:8080/images', async ({request}) => {
    const newPhoto = await request.json() as SavePhotoDto

    return HttpResponse.json({
      userId: uuid(),
      id: uuid(),
      description: newPhoto.description,
      imageUrl: newPhoto.imageUrl,
      createdAt: new Date()
    })
  })
]