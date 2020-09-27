import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
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
  overrides: {
    MuiAppBar: { // Name of the component ⚛️ / style sheet
      colorPrimary: { // Name of the rule
         backgroundColor: '#272b2f', // Some CSS
      },
    },
  },
});

export default theme;
