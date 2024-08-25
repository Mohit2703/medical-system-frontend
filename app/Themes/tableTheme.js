import { tableAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(tableAnatomy.keys)

const variantRounded = definePartsStyle({
    container: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        boxShadow: '20px 20px 50px rgba(0, 0, 0, 0.5)',
        color: '#f2f2f2',
        borderTop: '1px solid rgba(255, 255, 255, 0.3)',
        borderLeft: '1px solid rgba(255, 255, 255, 0.3)'
    },
    tr: {
        'td:first-child': {
            borderTopLeftRadius: 'full',
            borderBottomLeftRadius: 'full',
        },
        'td:last-child': {
            borderTopRightRadius: 'full',
            borderBottomRightRadius: 'full',
        },
    },
    th: {
        '&[data-is-numeric=true]': {
            textAlign: 'end',
        },
        color: "#f2f2f2",
    },
    td: {
        '&[data-is-numeric=true]': {
            textAlign: 'end',
        },
        color: "#f2f2f2",
    },
    tbody: {
        tr: {
            '&:nth-of-type(odd)': {
                'th, td': {
                    borderBottomWidth: '1px',
                    borderColor: `#1a1a1a`,
                },
                td: {
                    background: `rgba(0,0,0,0.6)`,
                },
            },
            '&:nth-of-type(even)': {
                'th, td': {
                    borderBottomWidth: '1px',
                    borderColor: `rgba(0, 0, 0, 0.6)`,
                },
                td: {
                    background: `rgba(0, 0, 0, 0.6)`,
                },
            },
        },
    },
    tfoot: {
        tr: {
            '&:last-of-type': {
                th: { borderBottomWidth: 0 },
            },
        },
    },
})

export const tableTheme = defineMultiStyleConfig({
    variants: { variantRounded },
})