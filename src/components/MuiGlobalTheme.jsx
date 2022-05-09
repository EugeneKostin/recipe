import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
import { deepOrange } from '@mui/material/colors';

export const MuiGlobalTheme = ({ children }) => {
  let theme = createTheme({
    palette: {
      primary: deepOrange,
      secondary: {
        main: '#333',
      },
      text: {
        primary: '#555555',
        secondary: '#777777',
      },
      background: { default: '#fafafa' },
    },
    typography: {
      htmlFontSize: 10,
      fontSize: 14,
      fontFamily: 'PT-Root-UI',
      h1: {
        fontSize: 30,
        fontWeight: 500,
        letterSpacing: '0.02em',
      },
      h2: {
        fontSize: 24,
        fontWeight: 500,
        letterSpacing: '0.02em',
      },
      subtitle1: {
        fontSize: 22,
        fontWeight: 500,
        lineHeight: 1.2,
        letterSpacing: '0.02em',
      },
      subtitle2: {
        fontSize: 20,
        fontWeight: 500,
        lineHeight: 1.2,
        letterSpacing: '0.02em',
      },
      body1: {
        fontSize: 18,
        letterSpacing: '0.02em',
      },
      body2: {
        fontSize: 14,
        letterSpacing: '0.02em',
      },
      button: {
        fontSize: 16,
        letterSpacing: '0.02em',
      },
      caption: {
        fontSize: 12,
        lineHeight: 1.5,
        letterSpacing: '0.02em',
      },
    },
  });
  theme = responsiveFontSizes(theme);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
