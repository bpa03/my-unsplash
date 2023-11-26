import {http, HttpResponse} from 'msw'
import photos from './data/photos.json'

export const unsplashHandlers = [
  http.get(`https://api.unsplash.com/photos`, () => HttpResponse.json(photos, {status: 200})),
  http.post(`https://api.unsplash.com/search/photos`, () => HttpResponse.json(photos, {status: 200}))
]
