import { Fade, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';

const StyledImg = styled('img')(() => ({
  width: '100%',
  height: 'auto',
}));

export default function Image({ ...props }) {
  const [load, setLoad] = useState(false);

  useEffect(() => setLoad(true), []);

  return (
    <Fade in={load} timeout={1000}>
      <Box sx={{ objectFit: 'cover', width: '100%', height: '100%', display: 'flex', alignItems: 'center' }}>
        <StyledImg {...props} />
      </Box>
    </Fade>
  );
}
