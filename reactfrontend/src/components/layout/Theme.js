import { createMuiTheme } from '@material-ui/core/styles';
import { colors } from '@material-ui/core';

const white = '#f0f5f9';
const black = '#000000';
const yellow = '#FFD91D';
const white_paper = '#393e46';
const text_white ='#eeeeee';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    black,
    white,
    yellow,
    primary: {
      contrastText: black,
      dark: colors.yellow[200],
      main: colors.yellow[600],
      light: colors.yellow[500]
    },
    secondary: {
      contrastText: black,
      dark: colors.red[500],
      main: colors.yellow[600],
      light: colors.yellow[500]
    },
    success: {
      contrastText: white,
      dark: colors.green[900],
      main: colors.green[600],
      light: colors.green[400]
    },
    info: {
      contrastText: white,
      dark: colors.blue[900],
      main: colors.blue[600],
      light: colors.blue[400]
    },
    warning: {
      contrastText: white,
      dark: colors.orange[900],
      main: colors.orange[600],
      light: colors.orange[400]
    },
    error: {
      contrastText: white,
      dark: colors.red[900],
      main: colors.red[600],
      light: colors.red[400]
    },
    text: {
      primary: text_white,
      secondary: colors.grey[500],
      link: colors.grey[600]
    },
    background: {
      default: '#232931',
      paper: white_paper
    },
    icon: colors.blueGrey[600],
    divider: colors.grey[200]
  }, 
});

export default theme;