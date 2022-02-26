import {
  Card,
  Box,
  CardContent,
  CardMedia,
  Typography,
  Chip,
} from '@mui/material';
import { CardActionArea } from '@mui/material';
import { NavLink as RouterLink } from 'react-router-dom';

export const RecipeCard = ({ recipe }) => {
  return (
    <Card sx={{ maxWidth: 345 }} elevation={3}>
      <CardActionArea component={RouterLink} to={`/recipe/${recipe.id}`}>
        <CardMedia
          component='img'
          height='140'
          image='/images/recipe.png'
          alt='green iguana'
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {recipe.title}
          </Typography>
          <Box
            sx={{
              '& > :not(:last-child)': {
                mr: 1,
              },
            }}
          >
            {recipe.ingredients.map((ingredient) => (
              <Chip
                key={ingredient.title}
                label={ingredient.title}
                size='small'
                sx={{
                  cursor: 'inherit',
                  bgcolor: 'inherit',
                  position: 'relative',
                  fontWeight: 'fontWeightBold',
                  p: 0,
                  '&::before': {
                    content: '""',
                    width: '70%',
                    height: '1px',
                    bgcolor: 'primary.main',
                    position: 'absolute',
                    bottom: 0,
                  },
                }}
              />
            ))}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
