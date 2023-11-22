'use client'
import React, {createContext, useContext, useCallback} from 'react'
import {FaUserAlt} from 'react-icons/fa'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalOverlay,
  HStack,
  Icon,
  Text,
  Box,
  useDisclosure,
  Spinner,
  Stack
} from '@chakra-ui/react'

type UnauthorizedModalContextService = {
  openModal: (cb?: () => void) => void
}

const UnauthorizedModalContext = createContext<UnauthorizedModalContextService>({} as UnauthorizedModalContextService)
export const useUnauthorizedModal = () => useContext(UnauthorizedModalContext)

const UnauthorizedModalServiceProvider = ({children}: {children: React.ReactNode}) => {
  const {isOpen, onOpen, onClose} = useDisclosure()

  const openModalAndRedirect = useCallback((cb?: () => void) => {
    onOpen()
    if (cb) cb()
  }, [onOpen])

  return (
    <>
      <UnauthorizedModalContext.Provider
        value={{openModal: openModalAndRedirect}}
      >
        {children}
      </UnauthorizedModalContext.Provider>
      <Modal onClose={onClose} size="xl" isOpen={isOpen} closeOnEsc={false} closeOnOverlayClick={false}>
        <ModalOverlay bg="blackAlpha.600" />
        <ModalContent>
          <ModalHeader>
            <HStack alignItems="center" spacing={3}>
              <Box
                as="span"
                display="flex"
                justifyContent="center"
                alignItems="center"
                w={10}
                h={10}
                border="1px solid"
                borderColor="primary.green"
                rounded="xl"
              >
                <Icon as={FaUserAlt} w={5} h={5} color="primary.green" />
              </Box>
              <Text fontSize="xl" color="primary.softDark">
                The session has expired. Please login
              </Text>
            </HStack>
          </ModalHeader>
          <ModalBody>
            <Stack justifyContent="center" spacing={4} pb={6} alignItems="center" mt={2.5}>
              <Spinner color="primary.green" size="xl" />
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default UnauthorizedModalServiceProvider
