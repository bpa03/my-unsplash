import {inputAnatomy as parts} from '@chakra-ui/anatomy'
import {createMultiStyleConfigHelpers, defineStyle} from '@chakra-ui/styled-system'
import {getColorVar, cssVar} from '@chakra-ui/theme-tools'

const {definePartsStyle, defineMultiStyleConfig} = createMultiStyleConfigHelpers(parts.keys)

const $fontSize = cssVar('input-font-size')
const $horizontalPadding = cssVar('input-horizontal-padding')
const $verticalPadding = cssVar('input-vertical-padding')
const $borderRadius = cssVar('input-border-radius')

const size = {
  sm: defineStyle({
    [$fontSize.variable]: 'fontSizes.sm',
    [$horizontalPadding.variable]: 'space.3.5',
    [$verticalPadding.variable]: 'space.3',
    [$borderRadius.variable]: 'radii.xl'
  }),
  md: defineStyle({
    [$fontSize.variable]: 'fontSizes.sm',
    [$horizontalPadding.variable]: 'space.5',
    [$verticalPadding.variable]: 'space.3.5',
    [$borderRadius.variable]: 'radii.xl'
  })
}

const baseStyle = definePartsStyle({
  field: {
    h: 'auto',
    px: $horizontalPadding.reference,
    py: $verticalPadding.reference
  }
})

const primary = definePartsStyle((props) => {
  const {theme} = props

  return {
    field: {
      border: '1px solid',
      borderColor: 'primary.gray',
      rounded: 'xl',
      color: 'blackAlpha.800',
      bg: 'transparent',
      _placeholder: {
        color: 'primary.gray'
      },
      _invalid: {
        zIndex: 1,
        borderColor: 'red.500',
        boxShadow: `0 0 0 1px ${getColorVar(theme, 'red.300')}`
      }
    }
  }
})

const sizes = {
  sm: definePartsStyle({
    field: size.sm
  }),
  md: definePartsStyle({
    field: size.md
  })
}

export const inputTheme = defineMultiStyleConfig({
  baseStyle,
  sizes,
  variants: {
    primary
  },
  defaultProps: {
    variant: 'primary',
    size: 'md'
  }
})
