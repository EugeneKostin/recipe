import { Card, Box, CardContent, CardMedia } from '@mui/material';
import { CardActionArea } from '@mui/material';
import { NavLink as RouterLink } from 'react-router-dom';
import TextOverflowWrapper from './UI/TextOverflowWrapper';

export const RecipeCard = ({ recipe }) => {
  return (
    <Card sx={{ maxWidth: 345 }} elevation={3}>
      <CardActionArea component={RouterLink} to={`/recipe/${recipe.id}`}>
        <CardMedia
          component='img'
          height='180'
          loading='lazy'
          image={recipe.imageURL ? recipe.imageURL : '/recipe/images/recipe.png'}
          alt='recipe'
        />
        <CardContent>
          <TextOverflowWrapper
            variant='subtitle1'
            component='span'
            multiline='true'
            overflowColor='#fff'
            sx={{ height: { xs: 35, sm: 45, md: 55 } }}>
            {recipe.title}
          </TextOverflowWrapper>

          <Box mt={1}>
            <TextOverflowWrapper
              variant='caption'
              multiline='true'
              overflowColor='#fff'
              sx={{ fontWeight: 'fontWeightLight', height: { xs: 35, sm: 40 } }}>
              {recipe.ingredients.map((ingredient) => ingredient.title + ', ')}
            </TextOverflowWrapper>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
