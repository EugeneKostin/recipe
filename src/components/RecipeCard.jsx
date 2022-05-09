import {Box, Card, CardActionArea, CardContent, CardMedia, Typography} from '@mui/material';
import {memo, useMemo} from 'react';
import {NavLink as RouterLink} from 'react-router-dom';
import TextOverflowWrapper from './UI/TextOverflowWrapper';
import {ReactComponent as ClockIcon} from '../static/icons/clock.svg';
import {ReactComponent as DishIcon} from '../static/icons/dish.svg';
import recipeImg from '../static/images/recipe.png';
import Image from './UI/Image';
import {PORTIONS_NUM_WORDS} from '../utils/constants';
import {getNumWord} from '../utils/helpers';

export const RecipeCard = memo(({recipe}) => {
  const recipeCreationDate = useMemo(
    () => (isNaN(recipe.createdOn) ? '' : new Date(recipe.createdOn?.seconds * 1000).toLocaleDateString('ru-RU')),
    [recipe]
  );
  return (
    <Card sx={{width: 345}} elevation={3}>
      <CardActionArea component={RouterLink} to={`/recipes/${recipe.id}`} sx={{height: '100%'}}>
        <CardMedia sx={{height: 180}}>
          <Image src={recipe.imageURL ? recipe.imageURL : recipeImg} alt='recipe'/>
        </CardMedia>
        <CardContent sx={{height: {xs: 180, sm: 200, md: 200, lg: 220}, display: 'flex', flexDirection: 'column'}}>
          <TextOverflowWrapper
            variant='subtitle1'
            component='span'
            multiline='true'
            overflowColor='#fff'
            sx={{maxHeight: {xs: 40, sm: 50, md: 55, lg: 60}}}>
            {recipe.title}
          </TextOverflowWrapper>
          <Box sx={{ mt: 1 }}>
            <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
              <ClockIcon height={20} width={20} />
              <Typography ml={1} variant='body2' component='span'>
                {recipe.cookingTime} мин.
              </Typography>
            </Box>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', ml: 2 }}>
              <DishIcon height={20} width={20} />
              <Typography ml={1} variant='body2' component='span'>
                {recipe.portionsNum} {getNumWord(recipe.portionsNum, PORTIONS_NUM_WORDS)}
              </Typography>
            </Box>
          </Box>
          <Box my={1}>
            <TextOverflowWrapper
              variant='body2'
              multiline='true'
              overflowColor='#fff'
              sx={{ fontWeight: 'fontWeightLight', maxHeight: { xs: 35, sm: 40 } }}>
              {recipe.ingredients.map((ingredient) => ingredient.title + ', ')}
            </TextOverflowWrapper>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 'auto' }}>
            <Typography variant='body2' component='span' sx={{ fontWeight: 'fontWeightMedium' }}>
              By: {'author'}
            </Typography>
            <Typography variant='body2' component='span'>
              {recipeCreationDate}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
});
