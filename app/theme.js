// theme.js
import { extendTheme, theme as base } from '@chakra-ui/react';
import { cardTheme } from './Themes/cardTheme';
import { modalTheme } from './Themes/modalTheme';
import { tableTheme } from './Themes/tableTheme';

export const theme = extendTheme({
  components: { Modal: modalTheme },
})

// Define your custom theme
const customTheme = extendTheme({
    config: {
        initialColorMode: 'dark', // or 'dark'
        useSystemColorMode: true,
    },
    styles: {
        global: (props) => ({
            body: {
                // bg: props.colorMode === 'dark' ? 'gray.800' : 'white',
                // color: props.colorMode === 'dark' ? 'white' : 'gray.800',
                bg: props.colorMode === 'gray.800',
                color: props.colorMode === 'white',
            },
        }),
    },
    colors: {
        brand: {
            100: "#f7fafc",
            900: "#1a202c",
        },
    },
    fonts: {
        heading: `Open Sans, ${base.fonts.heading}`,
        body: `Raleway, ${base.fonts.body}`,
    },
    components: {
        Card: cardTheme,
        Modal: modalTheme,
        Table: tableTheme,
    },
});

export default customTheme;
