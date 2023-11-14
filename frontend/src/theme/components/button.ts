import {defineStyle, defineStyleConfig} from '@chakra-ui/styled-system'

const sizes = {
  large: defineStyle({
    fontSize: 'md',
    py: '3',
    px: '12',
    minW: 'none',
    h: 'auto'
  }),
  lg: defineStyle({
    fontSize: 'lg',
    py: '5',
    px: '7',
    minW: 'none',
    h: 'auto'
  }),
  md: defineStyle({
    fontSize: 'md',
    py: '4',
    px: '5',
    minW: 'none',
    h: 'auto'
  }),
  sm: defineStyle({
    fontSize: 'sm',
    py: '3.5',
    px: '4',
    minW: 'none',
    h: 'auto'
  }),
  xs: defineStyle({
    fontSize: 'xs',
    py: '3',
    px: '2.5',
    minW: 'none',
    h: 'auto'
  })
}

const variants = {
  primary: defineStyle({
    bg: 'primary.green',
    color: 'white',
    rounded: 'xl'
  })
}

export const buttonTheme = defineStyleConfig({
  baseStyle: defineStyle({
    fontWeight: 700,
    boxShadow: '0px 4px 10px 0px #3db46d33'
  }),
  sizes,
  variants,
  defaultProps: {
    variant: 'primary',
    size: 'md'
  }
})
