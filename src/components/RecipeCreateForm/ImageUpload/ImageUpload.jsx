import { Button, Box, Dialog, DialogContent, DialogActions, Typography, Paper, IconButton, Grid } from '@mui/material';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import CheckIcon from '@mui/icons-material/Check';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Controller, useFormContext } from 'react-hook-form';
import { useEffect, useMemo, useState } from 'react';
import ImageUploadButton from './ImageUploadButton';
import Image from '../../UI/Image';
import UploadProgress from './UploadProgress';
import CloseIcon from '@mui/icons-material/Close';
import { uploadImage } from '../../../API/storage';
import { getPrettyFileSize } from '../../../utils/filleSizeConverter';

// {
//   <Controller
//     name={name}
//     control={control}
//     render={({ field }) => (
//       <>
//         <Button variant='contained' component='label' startIcon={<ArrowCircleUpIcon />}>
//           {field.value ? 'Изменить' : 'Загрузить'}
//           <input {...field} type='file' accept='.png,.jpg' hidden />
//         </Button>
//         <Box component='span' sx={{ ml: 2 }}>
//           {field.value ? field.value : 'Загрузите изображение'}
//         </Box>
//       </>
//     )}
//   />;
// }

const ImageUploadBar = ({ name, setImageURL }) => {
  const { control } = useFormContext();
  const [image, setImage] = useState(null);
  const [upload, setUpload] = useState({
    error: null,
    status: '',
    progress: 0,
  });

  useEffect(() => console.log(upload), [upload.status === 'successful']);

  const handleUploadChange = async (value) => {
    console.log(value);
    setImage(value);
    uploadImage(value, setUpload);
  };

  const fileSize = useMemo(() => getPrettyFileSize(image?.size) || '', [image]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ImageUploadButton variant='contained' color='primary' component='label'>
            {field.value ? <CheckIcon /> : <UploadFileIcon />}
            <input
              {...field}
              onChange={(e) => handleUploadChange(e.target.files[0])}
              type='file'
              accept='.png,.jpg'
              hidden
            />
          </ImageUploadButton>
          <Box sx={{ ml: 2, width: '100%' }}>
            {image ? (
              <Grid container spacing={1} wrap='nowrap'>
                <Grid item container direction='column' xs={10}>
                  <UploadProgress progress={upload.progress} fileName={image?.name} fileSize={fileSize} />
                </Grid>
                <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <IconButton color='primary'>
                    <CloseIcon />
                  </IconButton>
                </Grid>
              </Grid>
            ) : (
              'Загрузите изображение'
            )}
          </Box>
        </Box>
      )}
    />
  );
};

const ImagePreview = (imageURL) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          height: 'clamp(200px, calc(70vmin - 64px), 350px)',
          mt: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {imageURL.length ? (
          <Image src={imageURL} alt='recipe' />
        ) : (
          <Typography
            noWrap
            component='span'
            sx={{ fontSize: { xs: 48, sm: 64, md: 72 }, fontWeight: 'fontWeightMedium', color: 'grey.50' }}>
            Preview
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

const ImageUpload = ({ name, control, ...props }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [imageURL, setImageURL] = useState(null);

  const handleOpen = () => setDialogOpen(true);
  const handleClose = () => {
    // delete data
    setDialogOpen(false);
  };
  const handleSubmit = () => setDialogOpen(false);

  return (
    <Box {...props}>
      <Button onClick={handleOpen} variant='contained' component='label' startIcon={<ArrowCircleUpIcon />}>
        Загрузить
      </Button>
      <Dialog
        fullWidth
        open={dialogOpen}
        onClose={handleClose}
        PaperProps={{
          sx: { m: 0, width: 'calc(100vmin - 32px)', bgcolor: 'grey.50', height: 'max(500px, calc(100vmin - 32px)' },
        }}>
        <DialogContent sx={{ py: 4, px: { xs: 2, md: 4 } }}>
          <ImageUploadBar {...{ name, setImageURL }} />
          <ImagePreview imageURL={imageURL} />
        </DialogContent>
        <DialogActions sx={{ py: 4, px: { xs: 2, md: 4 } }}>
          <Button variant='outlined' onClick={handleClose}>
            Отмена
          </Button>
          <Button variant='contained' onClick={handleSubmit}>
            Загрузить
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ImageUpload;
