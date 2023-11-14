import {Container, Box, Button, HStack} from '@chakra-ui/react'
import ListOfUnsplashPhotos from '@/features/photos/containers/list-of-unsplash-photos-container'
import Searchbox from '@/features/shared/components/searchbox'

export default function Home() {
  return (
    <main>
      <Container maxW="container.xl" pt={8} pb={9}>
        <HStack justifyContent="space-between">
          <Box flex=".3">
            <Searchbox />
          </Box>
          <Button>Add a photo</Button>
        </HStack>
        <Box mt={10}>
          <ListOfUnsplashPhotos />
        </Box>
      </Container>
    </main>
  )
}
