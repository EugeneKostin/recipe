import { Box, Grid, LinearProgress, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const TextOverflowBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  whiteSpace: 'nowrap',
  width: '100%',
  textOverflow: 'clip',
  overflow: 'hidden',
  '&:before': {
    content: "''",
    width: '40px',
    height: '100%',
    position: 'absolute',
    right: 0,
    top: 0,
    background: `linear-gradient(90deg, transparent, ${theme.palette.grey[50]})`,
  },
}));

export default function UploadProgress({ progress = 0, fileName, fileSize }) {
  return (
    <Grid container direction='column'>
      <Box sx={{ width: '80%' }}>
        <TextOverflowBox variant='body1'>{fileName}</TextOverflowBox>
      </Box>
      <LinearProgress sx={{ borderRadius: 1 }} variant='determinate' value={progress} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant='body2' color='text.secondary'>
          {fileSize}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {progress === 100 ? 'Загружен' : `${progress} %`}
        </Typography>
      </Box>
    </Grid>
  );
}
