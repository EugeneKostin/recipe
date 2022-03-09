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
      }}
    >
      <Typography my={4} variant='h3' component='h1' color='textSecondary'>
        Рецепты
      </Typography>
      <Suspense fallback={<Loader />}>
        <RecipeList />
      </Suspense>
    </Container>
  );
};
