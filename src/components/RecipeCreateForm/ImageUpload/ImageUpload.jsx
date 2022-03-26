import { Button, Box, Dialog, DialogContent, DialogActions, Typography, Paper, IconButton, Grid } from '@mui/material';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Controller, useFormContext } from 'react-hook-form';
import { useCallback, useEffect, useMemo, useState } from 'react';
import ImageUploadIcon from './ImageUploadIcon';
import Image from '../../UI/Image';
import UploadProgress from './UploadProgress';
import CloseIcon from '@mui/icons-material/Close';
import { uploadImage } from '../../../API/storage';
import { getPrettyFileSize } from '../../../utils/filleSizeConverter';
import { imageUploadTask, getUploadTaskState, storageRef, deleteImage } from '../../../API/storage';
import { uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const ImageUploadBar = ({ imageData }) => {
  const { setValue: setFormValue } = useFormContext();
  const [upload, setUpload] = useState(false);
  const [uploadData, setUploadData] = useState({
    error: null,
    status: null,
    progress: 0,
  });

  useEffect(() => setUpload(false), [imageData]);
  useEffect(() => console.log(uploadData), [uploadData]);

  const handleUploadClick = () => {
    setUpload(true);
    const uploadTask = uploadBytesResumable(storageRef(imageData), imageData);
    console.log(uploadTask);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('progress', progress);
        setUploadData((prev) => ({ ...prev, progress }));
        switch (snapshot.state) {
          case 'paused':
            setUploadData((prev) => ({ ...prev, status: 'paused' }));
            break;
          case 'running':
            setUploadData((prev) => ({ ...prev, status: 'running' }));
            break;
        }
      },
      (error) => {
        setUploadData((prev) => ({ ...prev, error, status: 'error' }));
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUploadData((prev) => ({ ...prev, status: 'successful' }));
          console.log('File available at', downloadURL, uploadTask.snapshot.ref);
          console.log(imageData);
          setFormValue('imageURL', downloadURL);
          return downloadURL;
        });
      }
    );
  };

  const handleCancel = async () => {
    try {
      await deleteImage(imageData);
      setUpload(false);
    } catch (e) {
      console.error(e.message);
    }
  };

  const fileSize = useMemo(() => getPrettyFileSize(imageData?.size) || '', [imageData]);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', mt: 3 }}>
      {imageData && upload ? (
        <>
          <ImageUploadIcon>
            {uploadData.status === 'successful' ? <FileDownloadDoneIcon /> : <UploadFileIcon />}
          </ImageUploadIcon>
          <Box sx={{ ml: 1, width: { xs: 'calc(100% - 53px)', md: 'calc(100% - 68px)' } }}>
            <Grid container spacing={1} wrap='nowrap'>
              <Grid item xs={10}>
                <UploadProgress progress={uploadData.progress} fileName={imageData?.name} fileSize={fileSize} />
              </Grid>
              <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {uploadData.status === 'successful' && (
                  <IconButton onClick={handleCancel} color='primary'>
                    <CloseIcon />
                  </IconButton>
                )}
              </Grid>
            </Grid>
          </Box>
        </>
      ) : (
        <Button variant='contained' onClick={handleUploadClick} sx={{ mx: 'auto', width: '60%' }}>
          Загрузить
        </Button>
      )}
    </Box>
  );
};

const ImageImputWithPreview = ({ setImageData }) => {
  const [preview, setPreview] = useState(null);

  const handleImageInputChange = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      // error
      return;
    }
    const imageData = e.target.files[0];
    const objectUrl = URL.createObjectURL(imageData);
    setImageData(imageData);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          height: 'clamp(180px, calc(70vmin - 64px), 350px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}>
        <Box
          component='label'
          sx={{
            width: '100%',
            height: '100%',
            cursor: 'pointer',
            color: 'grey.100',
            p: preview ? 0 : { xs: 2, sm: 4 },
          }}>
          <input onChange={handleImageInputChange} name='image' type='file' accept='.png,.jpg,.svg' hidden />
          {preview ? (
            <Image src={preview} alt='preview' />
          ) : (
            <Box
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                border: '2px dashed',
                borderColor: 'grey.100',
              }}>
              <Box>
                <FileUploadIcon sx={{ width: 80, height: 'auto' }} />
              </Box>
              <Typography variant='body1'>.png .jpeg .svg</Typography>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

const ImageUpload = ({ ...props }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [imageData, setImageData] = useState(null);

  const handleOpen = () => setDialogOpen(true);
  const handleClose = () => {
    //set form data on close
    console.log('close');
    setDialogOpen(false);
    setImageData(null);
  };

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
          <ImageImputWithPreview {...{ setImageData }} />
          {imageData && <ImageUploadBar {...{ imageData }} />}
        </DialogContent>
        <DialogActions sx={{ py: 4, px: { xs: 2, md: 4 } }}>
          <Button variant='outlined' onClick={handleClose}>
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ImageUpload;
