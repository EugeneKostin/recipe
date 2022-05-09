import { Fade, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';

const StyledImg = styled('img')(() => ({
  width: '100%',
  objectFit: 'cover',
  height: '100%',
}));

export default function Image({ sx, src, alt, ...props }) {
  const [load, setLoad] = useState(false);

  useEffect(() => setLoad(true), []);

  return (
    <Fade in={load} timeout={1000}>
      <Box
        {...props}
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          ...sx,
        }}>
        <StyledImg {...{ src, alt }} />
      </Box>
    </Fade>
  );
}
