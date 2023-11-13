import {extendTheme} from '@chakra-ui/react'

// foundations
import {fonts} from './foundations/fonts'

export type Theme = Record<string, unknown>

const theme = extendTheme({
  fonts,
  styles: {
    globalConfig: {}
  }
})

export default theme