import {Container, Box} from '@chakra-ui/react'
import ListOfUnsplashPhotos from '@/features/photos/containers/list-of-unsplash-photos-container'
import Header from '@/features/shared/components/header'

export default async function Home() {
  return (
    <main>
      <Container maxW="container.xl" pt={8} pb={9}>
        <Header />
        <Box mt={10}>
          <ListOfUnsplashPhotos />
        </Box>
      </Container>
    </main>
  )
}
