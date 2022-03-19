import { Box, LinearProgress, Typography } from '@mui/material';

export default function UploadProgress({ progress = 0, fileName, fileSize }) {
  return (
    <>
      <Typography variant='body1' color='text.secondary'>
        {fileName}
      </Typography>
      <LinearProgress variant='determinate' value={progress} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant='body2' color='text.secondary'>
          {fileSize}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {progress} %
        </Typography>
      </Box>
    </>
  );
}
