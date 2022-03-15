import { CssBaseline } from '@mui/material';
import { AppRouter } from './components/AppRouter';
import { MuiGlobalTheme } from './components/MuiGlobalTheme';

const App = () => {
  return (
    <MuiGlobalTheme>
      <CssBaseline />
      <AppRouter />
    </MuiGlobalTheme>
  );
};

export default App