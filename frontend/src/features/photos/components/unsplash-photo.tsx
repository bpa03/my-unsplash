import {FC, useState} from 'react'
import {Image, Box, HStack} from '@chakra-ui/react'
import {Spinner, Button} from '@chakra-ui/react'
import {RxPlus} from 'react-icons/rx'
import {HiOutlineDownload} from 'react-icons/hi'

interface UnsplashPhotoProps {
  src: string
  alt: string
  isDownloading: boolean
  onOpenSaveModal: () => void
  onDownload: () => void
  userIsLogged: boolean
}

const UnsplashPhoto: FC<UnsplashPhotoProps> = ({
  alt,
  src,
  onOpenSaveModal,
  isDownloading,
  onDownload,
  userIsLogged
}) => {
  const [loading, setLoading] = useState(true)

  return (
    <Box
      position="relative"
      as="figure"
      minH={40}
      rounded="xl"
      maxH="min-content"
      overflow="hidden"
    >
      {loading && (
        <Box
          position="absolute"
          left="50%"
          top="50%"
          transform="translate(-50%, -50%)"
        >
          <Spinner
            color="primary.green"
            size="md"
            aria-label="spinner"
          />
        </Box>
      )}
      <Box
        zIndex="1"
        position="absolute"
        inset={0}
        display="flex"
        justifyContent="flex-end"
        p={4}
        transition="opacity .2s ease"
        opacity={0}
        _hover={{opacity: 1}}
        bgImage="linear-gradient(180deg,#00000057 0,rgba(0,0,0,.338) 3.5%,rgba(0,0,0,.324) 7%,rgba(0,0,0,.306) 10.35%,rgba(0,0,0,.285) 13.85%,rgba(0,0,0,.262) 17.35%,rgba(0,0,0,.237) 20.85%,rgba(0,0,0,.213) 24.35%,rgba(0,0,0,.188) 27.85%,rgba(0,0,0,.165) 31.35%,rgba(0,0,0,.144) 34.85%,rgba(0,0,0,.126) 38.35%,rgba(0,0,0,.112) 41.85%,rgba(0,0,0,.103) 45.35%,#0000001a 48.85%,rgba(0,0,0,.103) 52.35%,rgba(0,0,0,.112) 55.85%,rgba(0,0,0,.126) 59.35%,rgba(0,0,0,.144) 62.85%,rgba(0,0,0,.165) 66.35%,rgba(0,0,0,.188) 69.85%,rgba(0,0,0,.213) 73.35%,rgba(0,0,0,.237) 76.85%,rgba(0,0,0,.262) 80.35%,rgba(0,0,0,.285) 83.85%,rgba(0,0,0,.306) 87.35%,rgba(0,0,0,.324) 90.85%,rgba(0,0,0,.338) 94.35%,rgba(0,0,0,.347) 97.85%,#00000059)"
      >
        <HStack
          justifyContent="flex-end"
          alignItems="flex-start"
        >
          {userIsLogged && (
            <Button
              px={2}
              py={1.5}
              rounded="base"
              aria-label="save photo"
              _hover={{bg: 'green.600'}}
              transition="background .3s ease"
              onClick={onOpenSaveModal}
            >
              <RxPlus size="1.5rem" />
            </Button>
          )}
          <Button
            px={2}
            py={1.5}
            rounded="base"
            aria-label="Download photo"
            _hover={{bg: 'green.600'}}
            transition="background .3s ease"
            aria-disabled={isDownloading}
            isLoading={isDownloading}
            onClick={onDownload}
          >
            <HiOutlineDownload size="1.5rem" />
          </Button>
        </HStack>
      </Box>
      <Image
        src={src}
        alt={alt}
        width="100%"
        opacity={loading ? '0' : '1'}
        transition="opacity .3s ease-in"
        onLoad={() => setLoading(false)}
      />
    </Box>
  )
}

export default UnsplashPhoto
