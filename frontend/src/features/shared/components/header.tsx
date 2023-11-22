'use client'
import {FC} from 'react'
import NextLink from 'next/link'
import {Box, HStack, Spinner, Button, Link} from '@chakra-ui/react'
import {useDisclosure} from '@chakra-ui/react'
import {useSession} from 'next-auth/react'
import LoginModalContainer from '../../auth/containers/login-modal-container'
import LogoutButtonContainer from '@/features/auth/containers/logout-button-container'
import Searchbox from './searchbox'

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const {status} = useSession()
  const {isOpen, onClose, onOpen} = useDisclosure()

  return (
    <Box as="header">
      <HStack justifyContent="space-between">
        <Box>
          <Searchbox />
        </Box>
        {status === 'loading' && <Spinner size="md" color="primary.green" />}
        {status === 'authenticated' && (
          <HStack spacing={6}>
            <Box>
              <NextLink href="/profile/photos" legacyBehavior passHref>
                <Link _hover={{color: 'primary.green'}} transition="color .3s ease">My Photos</Link>
              </NextLink>
            </Box>
            <LogoutButtonContainer />
          </HStack>
        )}
        {status === 'unauthenticated' && (
          <Button onClick={onOpen}>Login</Button>
        )}
        <LoginModalContainer isOpen={isOpen} onClose={onClose} />
      </HStack>
    </Box>
  )
}

export default Header
