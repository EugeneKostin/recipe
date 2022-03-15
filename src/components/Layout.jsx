import { Container } from '@mui/material';
import { BottomNav } from './UI/BottomNav';
import { Outlet } from 'react-router-dom';
import { menuItems } from '../utils/menuItems';
import { TopNav } from './UI/TopNav';

export const Layout = () => {
  return (
    <>
      <TopNav menuItems={menuItems} />
      <Container
        maxWidth='false'
        disableGutters
        component='main'
        sx={{
          pb: { xs: '56px', md: 0 },
          pt: { xs: '56px', sm: '64px' },
        }}>
        <Outlet />
      </Container>
      <BottomNav menuItems={menuItems} />
    </>
  );
};
