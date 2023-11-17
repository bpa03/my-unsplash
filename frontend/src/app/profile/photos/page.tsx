import {Metadata} from 'next'
import NextLink from 'next/link'
import {redirect} from 'next/navigation'
import {HStack, Box, Container, Link} from '@chakra-ui/react'
import ListOfProfilePhotos from '@/features/photos/containers/list-of-profile-photos-container'
import LogoutButtonContainer from '@/features/auth/containers/logout-button-container'
import {getSession} from '@/lib/get-session'

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
						<HStack>
							<NextLink href="/photos/search?query=barcelona" legacyBehavior>
								<Link color="primary.green">
									Search Images
								</Link>
							</NextLink>
						</HStack>
            <LogoutButtonContainer />
          </HStack>
        </Box>
        <Box mt={10}>
          <ListOfProfilePhotos />
        </Box>
      </Container>
    </main>
  )
}
