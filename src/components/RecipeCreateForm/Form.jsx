import { Typography, Button, InputAdornment, Box, Grid } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import FormTextField from './FormTextField';
import FormInputNumWithControls from './FormInputNumWithControls';
import FormIngredientField from './FormIngredientField';
import ImageUpload from './ImageUpload/ImageUpload';
import { addDocument } from '../../API/firestore';

const schema = yup
  .object({
    title: yup.string().required().trim(),
    cookingTime: yup.number().positive().integer().required(),
    portionsNum: yup.number().positive().integer().min(1),
    instruction: yup.string(),
    imageURL: yup.string(),
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
  title: '',
  cookingTime: '',
  portionsNum: 3,
  instruction: '',
  imageURL: '',
  ingredients: [
    {
      title: '',
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

  const onSubmit = (data) => {
    console.log('data to send =>', data);
    (async () => {
      await addDocument(data);
      console.log('created');
    })();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FormTextField
          name='title'
          defaultValue={defaultValues.title}
          fullWidth
          label='Название блюда'
          variant='outlined'
          sx={{ mt: 6 }}
        />
        <Grid
          container
          columnSpacing={{ xs: 1, sm: 2, md: 4 }}
          wrap='nowrap'
          sx={{ mt: 4, justifyContent: { xs: 'space-between', sm: 'flex-start' } }}>
          <Grid item xs={6} sx={{ flexDirection: 'column' }}>
            <Typography variant='body1'>Время готовки</Typography>
            <FormTextField
              sx={{ mt: 1, width: 'min(100%, 144px)' }}
              name='cookingTime'
              defaultValue={defaultValues.cookingTime}
              placeholder='60'
              variant='outlined'
              InputProps={{
                endAdornment: <InputAdornment position='start'>мин.</InputAdornment>,
              }}
            />
          </Grid>
          <Grid
            item
            xs={6}
            sx={{ flexDirection: 'column', display: 'flex', alignItems: { xs: 'flex-end', sm: 'flex-start' } }}>
            <Typography variant='body1'>Количество порций</Typography>
            <FormInputNumWithControls name='portionsNum' sx={{ mt: 1 }} defaultValue={defaultValues.portionsNum} />
          </Grid>
        </Grid>
        <Box mt={6}>
          <Typography variant='h2' component='h2'>
            Ингредиенты
          </Typography>
          <FormIngredientField />
        </Box>

        <Typography variant='h2' component='h2' mt={6}>
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
        <Typography variant='h2' component='h2' mt={6}>
          Изображение рецепта
        </Typography>
        <ImageUpload sx={{ mt: 2 }} />
        <Button
          sx={{ display: 'block', mt: 8, mx: 'auto', width: 'min(90%, 350px)', height: 48 }}
          type='submit'
          variant='contained'>
          Создать
        </Button>
      </form>
    </FormProvider>
  );
};

export default Form;
