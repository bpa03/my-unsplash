import {FC, useState} from 'react'
import {Image, Box} from '@chakra-ui/react'
import {Spinner} from '@chakra-ui/react'

interface PhotoProps {
  src: string
  alt: string
}

const Photo: FC<PhotoProps> = ({alt, src}) => {
  const [loading, setLoading] = useState(true)

  return (
    <Box position="relative" minH={20}>
      {loading && (
        <Box position="absolute" left="50%" top="50%" transform="translate(-50%, -50%)">
          <Spinner color="primary.green" size="md" />
        </Box>
      )}
      <Image
        src={src}
        alt={alt}
        width="100%"
        opacity={loading ? '0' : '1'}
        transition="opacity .3s ease-in"
        rounded="xl"
        onLoad={() => setLoading(false)}
      />
    </Box>
  )
}

export default Photo
