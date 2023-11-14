import {extendTheme} from '@chakra-ui/react'

// foundations
import {fonts} from './foundations/fonts'
import {colors} from './foundations/colorts'

// components
import {buttonTheme} from './components/button'
import {inputTheme} from './components/input'

export type Theme = Record<string, unknown>

const theme = extendTheme({
  fonts,
  colors,
  styles: {
    globalConfig: {}
  },
  components: {
    Button: buttonTheme,
    Input: inputTheme
  }
})

export default theme
