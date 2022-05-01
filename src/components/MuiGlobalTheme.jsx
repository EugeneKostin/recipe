import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
import { deepOrange } from '@mui/material/colors';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export const MuiGlobalTheme = ({ children }) => {
  let theme = createTheme({
    palette: {
      primary: deepOrange,
      secondary: {
        main: '#333',
      },
      text: {
        primary: '#555555',
      },
      background: { default: '#fafafa' },
    },
    typography: {
      htmlFontSize: 10,
      fontSize: 14,
      h1: {
        fontSize: 30,
        fontWeight: 500,
        letterSpacing: '0.02em',
        color: '#555',
      },
      h2: {
        fontSize: 24,
        fontWeight: 500,
        letterSpacing: '0.02em',
        color: '#555',
      },
      subtitle1: {
        fontSize: 22,
        fontWeight: 500,
        lineHeight: 1.2,
        letterSpacing: '0.02em',
        color: '#555',
      },
      subtitle2: {
        fontSize: 20,
        fontWeight: 500,
        lineHeight: 1.2,
        letterSpacing: '0.02em',
        color: '#555',
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
        fontSize: 18,
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
