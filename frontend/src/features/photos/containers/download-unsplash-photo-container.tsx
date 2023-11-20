import {FC, useCallback, useState} from 'react'
import {Button, useToast} from '@chakra-ui/react'
import {HiOutlineDownload} from 'react-icons/hi'
import getUnsplashPhotoBuffer from '../api/get-unsplash-photo-buffer'

interface DownloadUnsplashPhotoContainerProps {
  downloadUrl: string
}

const DownloadUnsplashPhotoContainer: FC<DownloadUnsplashPhotoContainerProps> = ({downloadUrl}) => {
	const [isDownload, setIsDownload] = useState(false)
	const toast = useToast()

  const handleDownload = useCallback(async () => {
		setIsDownload(true)

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
			setIsDownload(false)
		}

  }, [downloadUrl, toast])

  return (
    <Button
      px={2}
      py={1.5}
      rounded="base"
      aria-describedby="Download image"
      _hover={{bg: 'green.600'}}
      transition="background .3s ease"
			isLoading={isDownload}
      onClick={handleDownload}
    >
      <HiOutlineDownload size="1.5rem" />
    </Button>
  )
}

export default DownloadUnsplashPhotoContainer
