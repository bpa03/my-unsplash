import {FC, useState, useCallback} from 'react'
import {useSession} from 'next-auth/react'
import useSavePhoto from '../hooks/use-save-photo'
import SavePhotoForm from '../components/save-photo-form'
import UnsplashPhoto from '../components/unsplash-photo'
import {
  useDisclosure,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useToast
} from '@chakra-ui/react'
import {SavePhotoDto} from '../types'
import getUnsplashPhotoBuffer from '../api/get-unsplash-photo-buffer'

interface UnsplashPhotoContainerProps {
  src: string
  alt: string
  downloadUrl: string
}

const UnsplashPhotoContainer: FC<UnsplashPhotoContainerProps> = ({
  alt,
  downloadUrl,
  src
}) => {
  const [isDownloading, setIsDownloading] = useState(false)
  const {status} = useSession()
  const toast = useToast()
  const {onOpen, onClose, isOpen} = useDisclosure()
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

  const handleDownload = useCallback(async () => {
    setIsDownloading(true)

    try {
      const {buffer, filename} = await getUnsplashPhotoBuffer(downloadUrl)
      const url = window.URL.createObjectURL(new Blob([buffer]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', filename)
      link.click()
    } catch (error) {
      toast({
        status: 'error',
        title: 'Error on try download image'
      })
    } finally {
      setIsDownloading(false)
    }
  }, [downloadUrl, toast])

  return (
    <>
			<UnsplashPhoto 
				alt={alt}
				isDownloading={isDownloading}
				onDownload={handleDownload}
				src={src}
				onOpenSaveModal={onOpen}
				userIsLogged={status === 'authenticated'}
			/>
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
              imageUrl={src}
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

export default UnsplashPhotoContainer
