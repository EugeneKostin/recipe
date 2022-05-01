import { Typography, Button, InputAdornment, Box, Grid, Divider, Stack } from '@mui/material';
import SummarizeIcon from '@mui/icons-material/Summarize';

import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import FormTextField from './FormTextField';
import FormInputNumWithControls from './FormInputNumWithControls';
import FormIngredientField from './FormIngredientField';
import ImageUpload from './ImageUpload/ImageUpload';
import { addDocument } from '../../API/firestore';
import {
  FORM_REQUIRED_MESSAGE,
  FORM_POSITIVE_MESSAGE,
  FORM_NUMBER_MIN_MESSAGE,
  FORM_NUMBER_TYPEERROR_MESSAGE,
} from '../../utils/constants';

yup.setLocale({
  mixed: {
    required: FORM_REQUIRED_MESSAGE,
  },
  number: {
    min: FORM_NUMBER_MIN_MESSAGE + ' ${min}',
    positive: FORM_POSITIVE_MESSAGE,
  },
});

const schema = yup.object({
  title: yup.string().required().trim(),
  cookingTime: yup
    .number()
    .typeError(FORM_NUMBER_TYPEERROR_MESSAGE)
    .required()
    .positive()
    .integer()
    .transform((value, originalValue) => (originalValue === '' ? undefined : value)),
  portionsNum: yup.number().typeError(FORM_NUMBER_TYPEERROR_MESSAGE).required().positive().integer().min(1),
  instruction: yup.string(),
  imageURL: yup.string(),
  createdOn: yup.date(),
  ingredients: yup
    .array()
    .of(
      yup.object().shape({
        title: yup.string().required().trim(),
        quantity: yup.string().required().trim(),
        units: yup.string(),
      })
    )
    .min(1, 'Ну добавь хотя бы один ингредиент'),
});

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
      units: '',
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
        <Box sx={{ mt: { xs: 6, md: 10 } }}>
          <MainSection />
          <FormDivider />
          <IngredientsSection />
          <FormDivider />
          <InstructionSection />
          <Button
            sx={{ display: 'block', mt: { xs: 6, md: 10 }, mx: 'auto', width: 'min(90%, 350px)', height: 48 }}
            type='submit'
            variant='contained'>
            Создать
          </Button>
        </Box>
      </form>
    </FormProvider>
  );
};

const MainSection = () => (
  <>
    <FormSectionHeader>1. Основная информация</FormSectionHeader>
    <FormTextField
      name='title'
      defaultValue={defaultValues.title}
      fullWidth
      label='Название блюда'
      variant='outlined'
    />
    <Grid
      container
      columnSpacing={{ xs: 1, sm: 2, md: 4 }}
      wrap='nowrap'
      sx={{ mt: { xs: 4, md: 6 }, justifyContent: { xs: 'space-between', sm: 'flex-start' } }}>
      <Grid item xs={6} sx={{ flexDirection: 'column' }}>
        <Typography variant='body1'>Время готовки</Typography>
        <FormTextField
          sx={{ mt: 1, width: { xs: 'min(100%, 144px)', sm: '50%' } }}
          name='cookingTime'
          defaultValue={defaultValues.cookingTime}
          placeholder='60'
          variant='outlined'
          type='number'
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
    <Box sx={{ mt: { xs: 4, md: 6 } }}>
      <Typography variant='body1'>Изображение рецепта</Typography>
      <ImageUpload sx={{ mt: 1 }} />
    </Box>
  </>
);

const IngredientsSection = () => (
  <>
    <FormSectionHeader>2. Ингредиенты</FormSectionHeader>
    <FormIngredientField />
  </>
);

const InstructionSection = () => (
  <>
    <FormSectionHeader icon={<SummarizeIcon />}>3. Инструкция приготовления</FormSectionHeader>
    <FormTextField
      defaultValue={defaultValues.cookingTime}
      helperText='Опишите процесс приготовления блюда'
      multiline
      minRows={5}
      name='instruction'
      fullWidth
    />
  </>
);

const FormSectionHeader = ({ children }) => (
  <Stack direction={'row'} alignItems={'center'} sx={{ mt: { xs: 3, md: 6 }, mb: { xs: 4, md: 8 } }}>
    <Box
      sx={{
        color: 'background.default',
        backgroundColor: 'primary.main',
        borderRadius: 1,
        p: 1,
      }}></Box>
    <Typography variant='h2' component='h2' sx={{ ml: 2 }}>
      {children}
    </Typography>
  </Stack>
);

const FormDivider = () => <Divider light sx={{ my: { xs: 6, md: 10 } }} />;

export default Form;
