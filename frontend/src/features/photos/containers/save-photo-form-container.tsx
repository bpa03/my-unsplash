import {FC} from 'react'
import {useSession} from 'next-auth/react'
import {
  useDisclosure,
  useToast,
  Button,
  Spinner,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay
} from '@chakra-ui/react'
import useSavePhoto from '../hooks/use-save-photo'
import SavePhotoForm from '../components/save-photo-form'
import {RxPlus} from 'react-icons/rx'
import {SavePhotoDto} from '../types'

interface SavePhotoFormContainerProps {
  imageUrl: string
}

const SavePhotoFormContainer: FC<SavePhotoFormContainerProps> = ({
  imageUrl
}) => {
  const {status} = useSession()
  const toast = useToast()
  const {onClose, onOpen, isOpen} = useDisclosure()
  const {isPending, mutate} = useSavePhoto({
    config: {
      onSuccess: () => {
        toast({
          status: 'success',
          duration: 1500,
          title: 'Photo saved successfully'
        })
        setTimeout(() => onClose(), 500)
      },
      onError: () => {
        toast({
          status: 'error',
          duration: 1500,
          title: 'Error on save photo'
        })
      }
    }
  })

  if (status === 'loading') {
    return <Spinner size="sm" color="primary.green" />
  }

  if (status === 'unauthenticated') {
    return null
  }

  return (
    <>
      <Button
        px={2}
        py={1.5}
        rounded="base"
        aria-describedby="Add image"
        _hover={{bg: 'green.600'}}
        transition="background .3s ease"
        onClick={() => onOpen()}
      >
        <RxPlus size="1.5rem" />
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent py={3.5}>
          <ModalBody>
            <SavePhotoForm
              loading={isPending}
              imageUrl={imageUrl}
              onSubmit={(form) => {
                const body: SavePhotoDto = {
                  description: form.description,
                  imageUrl: form.imageUrl
                }

                mutate(body)
              }}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default SavePhotoFormContainer
