import { useState } from 'react';
import { Container, Typography, Button, TextField } from '@mui/material';
import { IngredientField } from '../components/IngredientField';
import { CreateRecipeFormContext } from '../context';
const titleValidator = /^[A-Za-zА-Яа-я0-9\s]*$/;

export const Create = () => {
  // localStorage || ''

  const [formData, setFormData] = useState({
    title: '',
    description: '',
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
    if (!formData.title || titleError) {
      return;
    }
    console.log('data to send =>', formData);
  };
  const handleChange = (e) => {
    // lodash debounce для пауцы при вводе
    const value = e.target.value;
    const name = e.target.name;
    console.log(formData);
    setFormData((prevState) => ({
      ...prevState,
      [name]: value.replace(/\s+/g, ' ').trim(),
    }));
  };
  const titleValidate = (e) => {
    const value = e.target.value;
    if (!value) {
      setTitleError('Пожалуйста, введите название блюда');
    } else if (!titleValidator.test(value)) {
      setTitleError(
        'Пожалуйста, введите корректное название блюда (только буквы и цифры)'
      );
    } else {
      setTitleError(null);
    }
  };
  return (
    <CreateRecipeFormContext.Provider
      value={{
        formData,
        setFormData,
      }}
    >
      <Container maxWidth='md'>
        <Typography
          className='header'
          variant='h6'
          color='textSecondary'
          align='center'
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
            multiline
            fullWidth
            name='title'
            value={formData.title}
            onChange={(e) => {
              handleChange(e);
              titleValidate(e);
            }}
            onBlur={titleValidate}
            error={titleError}
            helperText={titleError ? titleError : ' '}
            required
          />

          <Typography variant='body1' mt={5}>
            Ингредиенты
          </Typography>
          <IngredientField />
          <Typography variant='body1' mt={5}>
            Рецепт
          </Typography>
          <TextField
            sx={{ mt: 2 }}
            helperText='Опишите процесс приготовления блюда'
            multiline
            rows={4}
            name='description'
            value={formData.description}
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
