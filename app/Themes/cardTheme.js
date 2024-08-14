import { cardAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardAnatomy.keys)

const baseStyle = definePartsStyle({
  // define the part you're going to style
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    boxShadow: '20px 20px 50px rgba(0, 0, 0, 0.5)',
    color: 'white',
    borderTop: '1px solid rgba(255, 255, 255, 0.3)',
    borderLeft: '1px solid rgba(255, 255, 255, 0.3)'
  },
  header: {
    paddingBottom: '2px',
    color: '#d97757',
  },
  body: {
    paddingTop: '2px',
  },
  footer: {
    paddingTop: '2px',
    
  },
  
})

const sizes = {
  md: definePartsStyle({
    container: {
      borderRadius: '5px',
    },
  }),
}

export const cardTheme = defineMultiStyleConfig({ baseStyle, sizes })