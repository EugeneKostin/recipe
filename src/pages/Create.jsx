import Form from '../components/RecipeCreateForm/Form';
import { Container, Typography } from '@mui/material';

export const Create = () => {
  return (
    <Container maxWidth='md' sx={{ pb: 8 }}>
      <Typography className='header' variant='h1' component='h1' mt={6}>
        Новый Рецепт
      </Typography>
      <Form />
    </Container>
  );
};
