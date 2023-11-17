import {Metadata} from 'next'
import ListOfUnsplashPhotos from '@/features/photos/containers/list-of-unsplash-photos-container'

export const metadata: Metadata = {
  title: 'Unsplash Photos'
}

export default async function Photos() {
  return <ListOfUnsplashPhotos />
}
