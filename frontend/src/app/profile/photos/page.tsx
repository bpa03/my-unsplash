import {Metadata} from 'next'
import {redirect} from 'next/navigation'
import {HStack, Box, Container} from '@chakra-ui/react'
import ListOfProfilePhotos from '@/features/photos/containers/list-of-profile-photos-container'
import LogoutButtonContainer from '@/features/auth/containers/logout-button-container'
import {getSession} from '@/lib/get-session'
import Searchbox from '@/features/shared/components/searchbox'

export const metadata: Metadata = {
  title: 'Profile Photos'
}

export default async function ProfilePhotos() {
  const session = await getSession()

  if (!session) {
    redirect('/')
  }

  return (
    <main>
      <Container maxW="container.xl" pt={8} pb={9}>
        <Box as="header">
          <HStack justifyContent="space-between" alignItems="center">
						<Box flex={.3}>
							<Searchbox />
						</Box>
            <HStack>
              <LogoutButtonContainer />
            </HStack>
          </HStack>
        </Box>
        <Box mt={10}>
          <ListOfProfilePhotos />
        </Box>
      </Container>
    </main>
  )
}
