import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      50: '#f4f9ff',
      100: '#d9e8ff',
      200: '#bacffd',
      300: '#8da5e5',
      400: '#6185c5',
      500: '#446ee7',
      600: '#3651b7',
      700: '#273b88',
      800: '#19255a',
      900: '#0b0e2d',
    },
  },
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
  },

  styles: {
    global: {},
  },
});
export default theme;
