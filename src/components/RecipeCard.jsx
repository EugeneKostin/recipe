import { Card, Box, CardContent, CardMedia, Typography, Chip } from '@mui/material';
import { CardActionArea } from '@mui/material';
import { NavLink as RouterLink } from 'react-router-dom';

export const RecipeCard = ({ recipe }) => {
  return (
    <Card sx={{ maxWidth: 345 }} elevation={3}>
      <CardActionArea component={RouterLink} to={`/recipe/${recipe.id}`}>
        <CardMedia
          component='img'
          height='180'
          image={recipe.imageURL ? recipe.imageURL : '/recipe/images/recipe.png'}
          alt='recipe'
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {recipe.title}
          </Typography>
          <Box mt={1}>
            <Typography variant='caption' sx={{ lineHeight: 1, fontWeight: 'fontWeightLight' }}>
              {recipe.ingredients.map((ingredient) => ingredient.title + ', ')}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
