'use client'
import {FC} from 'react'
import {Box, HStack, Spinner, Button} from '@chakra-ui/react'
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
        <Box flex=".3">
          <Searchbox />
        </Box>
        {status === 'loading' && <Spinner size="md" color="primary.green" />}
        {status === 'authenticated' && <LogoutButtonContainer />}
        {status === 'unauthenticated' && <Button onClick={onOpen}>Login</Button>}
        <LoginModalContainer isOpen={isOpen} onClose={onClose} />
      </HStack>
    </Box>
  )
}

export default Header
