import { Box, Grid, LinearProgress, Typography } from '@mui/material';
import TextOverflowWrapper from '../../UI/TextOverflowWrapper';

export default function UploadProgress({ progress = 0, fileName, fileSize }) {
  return (
    <Grid container direction='column'>
      <Box sx={{ width: '80%' }}>
        <TextOverflowWrapper variant='body1'>{fileName}</TextOverflowWrapper>
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
