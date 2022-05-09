import React from 'react';
import { Typography } from '@mui/material';

export default function PageTitle({ children }) {
  return (
    <Typography variant='h1' component='h1' mt={6} textTransform={'uppercase'}>
      {children}
    </Typography>
  );
}
