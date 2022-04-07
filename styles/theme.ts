import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'
const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const styles = {
  global: (props: any) => ({
    body: {
      bg: mode('black', 'black')(props),
    },
  }),
}

const colors = {
}

const components = {
  Button: {
    sizes: {
      sm: {
        fontSize: '1rem',
        fontWeight: 500,
      },
      md: {
        fontSize: '1rem',
        fontWeight: 500,
      },
      lg: {
        fontSize: '1rem',
        fontWeight: 500,
      },
    },
    baseStyle: {
      _focus: {
        boxShadow: "none"
      }
    }
  },
  Heading: {
    baseStyle: {
      fontWeight: 600,
      color: "white"
    },
  },
  Text: {
    baseStyle: {
      color: "white"
    },
  }
}

const font = {
}

const overrides = {
  config,
  colors,
  components,
  font,
  styles,
}

const theme = extendTheme(overrides)
export default theme