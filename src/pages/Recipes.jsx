import { Container } from '@mui/material';
import { Loader } from '../components/UI/Loader';
import React, { Suspense } from 'react';
import PageTitle from '../components/UI/PageTitle';

const RecipeList = React.lazy(() => import('../components/RecipeList'));

export const Recipes = () => {
  return (
    <Container
      sx={{
        pb: 8,
      }}>
      <PageTitle>Рецепты</PageTitle>
      <Suspense fallback={<Loader />}>
        <RecipeList sx={{ mt: { xs: 0, md: 4 } }} />
      </Suspense>
    </Container>
  );
};
