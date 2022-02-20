import { CssBaseline } from '@mui/material';
import { AppRouter } from './components/AppRouter';
import { MuiGlobalTheme } from './components/MuiGlobalTheme';

export const App = () => {
  return (
    <MuiGlobalTheme>
      <CssBaseline />
      <AppRouter />
    </MuiGlobalTheme>
  );
};
