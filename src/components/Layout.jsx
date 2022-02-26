import { Container } from '@mui/material';
import { BottomNav } from './BottomNav';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { menuItems } from '../utils/menuItems';
import { TopNav } from './TopNav';

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
        }}
      >
        <Outlet />
      </Container>
      <BottomNav menuItems={menuItems} />
    </>
  );
};
