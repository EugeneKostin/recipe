import { Typography, Container } from '@mui/material';
import { Loader } from '../components/UI/Loader';
import React, { Suspense } from 'react';

const RecipeList = React.lazy(() => import('../components/RecipeList'));

export const Recipes = () => {
  console.log('loop');

  return (
    <Container
      maxWidth='xl'
      sx={{
        pb: 8,
      }}>
      <Typography my={6} variant='h1' component='h1'>
        Рецепты
      </Typography>
      <Suspense fallback={<Loader />}>
        <RecipeList />
      </Suspense>
    </Container>
  );
};
