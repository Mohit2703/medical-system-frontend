import { modalAnatomy as parts } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const baseStyle = definePartsStyle({
  // define the part you're going to style
  overlay: {
    bg: `rgba(0, 0, 0, 0.6)`,
  },
  dialog: {
    borderRadius: 'md',
    bg: `#1a1a1a`,
  }, 
})

export const modalTheme = defineMultiStyleConfig({
  baseStyle,
})