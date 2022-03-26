import Form from '../components/RecipeCreateForm/Form';
import { Container, Typography } from '@mui/material';

export const Create = () => {
  return (
    <Container maxWidth='md' sx={{ pb: 8 }}>
      <Typography className='header' variant='h4' color='textSecondary' component='h1' mt={8}>
        Новый Рецепт
      </Typography>
      <Form />;
    </Container>
  );
};
