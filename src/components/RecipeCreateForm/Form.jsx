import { useState, useCallback } from 'react';
import {
  Container,
  Typography,
  Button,
  TextField,
  InputAdornment,
  ButtonGroup,
  IconButton,
  Box,
  Grid,
} from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import FormTextField from './FormTextField';
import FormInputNumWithControls from './FormInputNumWithControls';
import FormIngredientField from './FormIngredientField';
import ImageUpload from './ImageUpload/ImageUpload';

const schema = yup
  .object({
    title: yup.string().required().trim(),
    cookingTime: yup.number().positive().integer().required(),
    portionsNum: yup.number().positive().integer().min(1),
    instruction: yup.string(),
    image: yup.string(),
    createdOn: yup.date(),
    ingredients: yup.array().of(
      yup.object().shape({
        title: yup.string().trim(),
        quantity: yup.string().trim(),
        units: yup.string(),
      })
    ),
  })
  .required();

const defaultValues = {
  title: '1',
  cookingTime: '1',
  portionsNum: 3,
  instruction: '',
  image: '',
  ingredients: [
    {
      title: '123',
      quantity: '',
      units: 'гр.',
    },
  ],
  createdOn: new Date(),
};

const Form = () => {
  // localStorage || ''

  const methods = useForm({
    mode: 'onTouched',
    resolver: yupResolver(schema),
    defaultValues,
  });

  const onSubmit = useCallback((data) => {
    console.log(data);
  });

  return (
    <Container maxWidth='md' sx={{ pb: 8 }}>
      <Typography className='header' variant='h4' color='textSecondary' component='h1' mt={8}>
        Новый Рецепт
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <FormTextField
            name='title'
            defaultValue={defaultValues.title}
            fullWidth
            label='Название блюда'
            variant='outlined'
            sx={{ mt: 5 }}
          />
          <Grid container sx={{ mt: 5, justifyContent: 'space-between' }}>
            <FormTextField
              name='cookingTime'
              defaultValue={defaultValues.cookingTime}
              label='Время готовки'
              variant='outlined'
              InputProps={{
                endAdornment: <InputAdornment position='start'>мин.</InputAdornment>,
              }}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant='body1'>Количество порций</Typography>
              <FormInputNumWithControls name='portionsNum' defaultValue={defaultValues.portionsNum} />
            </Box>
          </Grid>
          <FormIngredientField />
          <Typography variant='body1' mt={5}>
            Инструкция приготовления
          </Typography>
          <FormTextField
            defaultValue={defaultValues.cookingTime}
            helperText='Опишите процесс приготовления блюда'
            multiline
            minRows={5}
            name='instruction'
            fullWidth
            sx={{ mt: 2 }}
          />
          <Typography variant='body1' mt={5}>
            Изображение рецепта
          </Typography>
          <ImageUpload name='image' sx={{ mt: 2 }} />
          <Button sx={{ display: 'block', mt: 8, mx: 'auto' }} type='submit' variant='contained'>
            Создать
          </Button>
        </form>
      </FormProvider>
    </Container>
  );
};

export default Form;
