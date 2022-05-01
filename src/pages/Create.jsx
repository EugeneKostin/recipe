import Form from '../components/RecipeCreateForm/Form';
import { Container } from '@mui/material';
import PageTitle from '../components/UI/PageTitle';

export const Create = () => {
  return (
    <Container maxWidth={'md'} sx={{ pb: 8 }}>
      <PageTitle>Новый Рецепт</PageTitle>
      <Form />
    </Container>
  );
};
