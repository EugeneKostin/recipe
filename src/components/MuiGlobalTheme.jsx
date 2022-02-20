import { ThemeProvider, createTheme } from "@mui/material/styles";
import { grey, deepOrange } from "@mui/material/colors";

export const MuiGlobalTheme = ({ children }) => {
  const theme = createTheme({
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

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
