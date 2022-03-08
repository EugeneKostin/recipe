import { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  TextField,
  InputAdornment,
  ButtonGroup,
  Box,
} from '@mui/material';
import InputUnstyled from '@mui/base/InputUnstyled';
import { IngredientField } from '../components/IngredientField';
import { CreateRecipeFormContext } from '../context';
import { FormValidator } from '../utils/formValidator';
import { removeSpaces } from '../utils/removeSpaces';
import { addDocument } from '../API/firestore';

export const Create = () => {
  // localStorage || ''

  const [formData, setFormData] = useState({
    title: '',
    cooking_time: 3,
    instruction: '',
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
          mt={5}
        >
          Новый Рецепт
        </Typography>
        <form noValidate autoComplete='off' onSubmit={handleSubmit}>
          <TextField
            sx={{ mt: 5 }}
            label='Название блюда'
            variant='standard'
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
            variant='standard'
            name='cooking_time'
            value={formData.cooking_time}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position='start'>мин.</InputAdornment>
              ),
            }}
          />
          <ButtonGroup variant='contained' aria-label='count button group'>
            <Button>-</Button>
            <TextField
              variant='standard'
              name='cooking_time'
              value={formData.cooking_time}
              onChange={handleChange}
              readOnly='true'
            />
            <Button>+</Button>
          </ButtonGroup>
          <TextField
            label='Name'
            InputProps={{
              input: <CustomInput name='amount' id='amount-simple' />,
            }}
          />
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
          <Button
            sx={{ display: 'block', mt: 5, mx: 'auto' }}
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
