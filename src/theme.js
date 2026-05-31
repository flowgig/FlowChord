import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#C32A22',
    },
    secondary: {
      main: '#19857b',
    },
    background: {
      default: '#fff',
    }
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: '#272b2f',
        },
      },
    },
  },
});

export default theme;
