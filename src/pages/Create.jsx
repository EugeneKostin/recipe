import { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  TextField,
  InputAdornment,
  ButtonGroup,
  IconButton,
  Box,
} from '@mui/material';
import { IngredientField } from '../components/IngredientField';
import { CreateRecipeFormContext } from '../context';
import { FormValidator } from '../utils/formValidator';
import { removeSpaces } from '../utils/removeSpaces';
import { addDocument } from '../API/firestore';
import { Input } from '../components/UI/Input';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ImageUpload from '../components/ImageUpload';
import { uploadImage, imageRef } from '../API/storage';

export const Create = () => {
  // localStorage || ''

  const [formData, setFormData] = useState({
    title: '',
    cookingTime: '',
    portionsNum: 3,
    instruction: '',
    imageUrl: '',
    ingredients: [
      {
        id: 0,
        title: '',
        quantity: '',
        units: 'гр.',
      },
    ],
  });
  const [titleError, setTitleError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData.title, 'err', titleError);
    titleValidate(formData.title);
    if (!formData.title || titleError) {
      return;
    }

    console.log('data to send =>', formData);
    (async () => {
      await addDocument(formData);
      console.log('yes');
    })();
  };

  const handleChange = (e) => {
    // lodash debounce для пауцы при вводе
    const name = e.target.name;
    const value = e.target.value;
    name === 'title' && titleValidate(value);
    console.log(formData);
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const titleValidate = (value) => {
    const validator = new FormValidator(value);
    setTitleError(
      validator.requiredValidateError() || validator.regexValidateError()
    );
  };
  const titleRegex = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      title: removeSpaces(e.target.value),
    }));
  };

  const onUploadChange = (image) => {
    console.log(imageRef(image));
    uploadImage(image);
    setFormData((prevState) => ({
      ...prevState,
      imageUrl: imageRef(image),
    }));
  };

  return (
    <CreateRecipeFormContext.Provider
      value={{
        formData,
        setFormData,
      }}
    >
      <Container maxWidth='md' sx={{ pb: 8 }}>
        <Typography
          className='header'
          variant='h4'
          color='textSecondary'
          component='h1'
          mt={8}
        >
          Новый Рецепт
        </Typography>
        <form noValidate autoComplete='off' onSubmit={handleSubmit}>
          <TextField
            sx={{ mt: 5 }}
            label='Название блюда'
            variant='outlined'
            fullWidth
            name='title'
            value={formData.title}
            onChange={handleChange}
            onBlur={titleRegex}
            error={!!titleError}
            helperText={titleError ? titleError : ' '}
            required
          />
          <TextField
            label='Время готовки'
            variant='outlined'
            name='cooking_time'
            value={formData.cookingTime}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position='start'>мин.</InputAdornment>
              ),
            }}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 4 }}>
            <Typography variant='body1'>Количество порций</Typography>
            <ButtonGroup
              variant='contained'
              aria-label='portions button group'
              sx={{ ml: 3 }}
            >
              <IconButton
                aria-label='reduce'
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    portionsNum: prev.portionsNum - 1,
                  }))
                }
                color='primary'
              >
                <RemoveIcon />
              </IconButton>
              <Input name='portionsNum' value={formData.portionsNum} />
              <IconButton
                aria-label='add'
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    portionsNum: prev.portionsNum + 1,
                  }))
                }
                color='primary'
              >
                <AddIcon />
              </IconButton>
            </ButtonGroup>
          </Box>
          <Typography variant='body1' mt={5}>
            Ингредиенты
          </Typography>
          <IngredientField />
          <Typography variant='body1' mt={5}>
            Инструкция приготовления
          </Typography>
          <TextField
            sx={{ mt: 2 }}
            helperText='Опишите процесс приготовления блюда'
            multiline
            rows={4}
            name='instruction'
            value={formData.instruction}
            onChange={handleChange}
            fullWidth
          />
          <Typography variant='body1' mt={5}>
            Изображение рецепта
          </Typography>
          <ImageUpload
            name={formData.imageUrl}
            onChange={onUploadChange}
            sx={{ mt: 2 }}
          />
          <Button
            sx={{ display: 'block', mt: 8, mx: 'auto' }}
            type='submit'
            variant='contained'
          >
            Создать
          </Button>
        </form>
      </Container>
    </CreateRecipeFormContext.Provider>
  );
};
