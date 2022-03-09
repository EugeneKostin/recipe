import { Box, CircularProgress } from '@mui/material';

export const Loader = () => {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '50vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress />
    </Box>
  );
};
