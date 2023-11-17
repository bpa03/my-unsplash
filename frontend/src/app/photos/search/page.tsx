import {Metadata} from 'next'
import {redirect} from 'next/navigation'
import ListOfSearchedUnsplashPhotos from '@/features/photos/containers/list-of-searched-photos-container'

export async function generateMetadata({
  searchParams
}: {
  params: { [key: string]: string }
  searchParams: { [key: string]: string }
}): Promise<Metadata> {
  const {query} = searchParams

  return {
    title: `${query} - My Unsplash`
  }
}

export default async function SearchPhotos({
  searchParams
}: {
  params: { [key: string]: string }
  searchParams: { [key: string]: string }
}) {
  const query = searchParams?.query

  if (!query) {
    redirect('/')
  }

  return <ListOfSearchedUnsplashPhotos />
}
