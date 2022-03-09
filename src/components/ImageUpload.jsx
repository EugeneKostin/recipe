import { Button, Box } from '@mui/material';
import { useState, useEffect } from 'react';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ImageUpload = ({ name, onChange, ...props }) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    image && onChange(image);
  }, [image]);

  return (
    <Box {...props}>
      <Button
        variant='contained'
        component='label'
        startIcon={<ArrowCircleUpIcon />}
      >
        {image ? 'Изменить' : 'Загрузить'}
        <input
          type='file'
          accept='.png,.jpg'
          name={name}
          hidden
          onChange={(e) => setImage(e.target.files[0])}
        />
      </Button>
      <Box component='span' sx={{ ml: 2 }}>
        {image && image.name}
      </Box>
    </Box>
  );
};

export default ImageUpload;
