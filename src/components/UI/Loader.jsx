import { Box, CircularProgress } from '@mui/material';

export const Loader = ({sx}) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...sx
      }}
    >
      <CircularProgress />
    </Box>
  );
};
