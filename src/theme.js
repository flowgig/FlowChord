import { red } from '@material-ui/core/colors';
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
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
    markerColor0: {
      main: '#2274d8'
    },
    markerColor1: {
      main: '#03AFBF'
    },
    markerColor2: {
      main: '#1CC43B'
    },
    markerColor3: {
      main: '#ED9D07'
    },
    markerColor4: {
      main: '#f3382b'
    },
    markerColor5: {
      main: '#841726'
    },
    markerColor6: {
      main: '#512DA8'
    },
    markerColor7: {
      main: '#CD22D8'
    },
    markerColor8: {
      main: '#C2185B'
    },
    markerColor9: {
      main: '#388E3C'
    },
    markerColor10: {
      main: '#00796'
    },
    markerColor11: {
      main: '#90521'
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

const markerColorCodes = ['#2274d8','#03AFBF','#1CC43B','#ED9D07','#f3382b','#841726','#512DA8','#CD22D8','#C2185B','#388E3C','#00796B','#90521e'];

const markerColorThemes = markerColorCodes.map(colorCode => {
  const markerTheme = createMuiTheme({
    palette: {
      primary: {main: colorCode},
    },
  });
  return {
    palette: markerTheme.palette
  };
})


export {markerColorThemes};

export default theme;
