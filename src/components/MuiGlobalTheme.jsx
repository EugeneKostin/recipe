import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from '@mui/material/styles';
import { grey, deepOrange } from '@mui/material/colors';

export const MuiGlobalTheme = ({ children }) => {
  let theme = createTheme({
    palette: {
      primary: deepOrange,
      secondary: grey,
    },
    // typography: {
    //   fontFamily: 'Quicksand',
    //   fontWeightLight: 400,
    //   fontWeightRegular: 500,
    //   fontWeightMedium: 600,
    //   fontWeightBold: 700,
    // }
  });
  theme = responsiveFontSizes(theme);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
