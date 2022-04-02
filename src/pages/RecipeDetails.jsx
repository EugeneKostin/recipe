import { Typography, Container, Box, Paper, List, ListItem, Button, ListItemButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useState, useEffect, memo, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { getDocumentById } from '../API/firestore';
import Image from '../components/UI/Image';
import { ReactComponent as ClockIcon } from '../static/icons/clock.svg';
import { ReactComponent as DishIcon } from '../static/icons/dish.svg';
import CheckBox from '../components/UI/CheckBox';
import { styled, alpha } from '@mui/material/styles';
import RecipeImg from '../static/images/recipe.png';

const StyledImageWrapper = styled(Image)(({ theme }) => ({
  height: 250,
  position: 'relative',
  '&:before': {
    content: "''",
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.4,
    background: `linear-gradient(-45deg, ${theme.palette.primary.main}, ${theme.palette.background.default})`,
  },
  [theme.breakpoints.up('sm')]: {
    height: 350,
  },
  [theme.breakpoints.up('md')]: {
    height: 450,
  },
}));

const StyledGlassWrapper = styled(Paper)(({ theme }) => ({
  position: 'relative',
  width: '80%',
  minHeight: 100,
  backgroundColor: alpha(theme.palette.background.paper, 0.2),
  marginTop: -24,
  zIndex: 1,
  marginLeft: 'auto',
  marginRight: 'auto',
  backdropFilter: 'blur(20px)',
  borderRadius: 14,
  display: 'flex',
  flexDirection: 'column',
  padding: 16,
  boxShadow:
    '2px 2px 6px rgba(0, 0, 0, 0.1), inset 1px 1px 4px rgba(255, 255, 255, 0.05), inset -1px -1px 4px rgba(255, 87, 34, 0.05)',
}));

export const RecipeDetails = memo(() => {
  const { id: recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  console.log(recipe);
  useEffect(() => {
    (async () => {
      const data = await getDocumentById(recipeId);
      setRecipe(data);
    })();
  }, [recipeId]);

  const ingredientsNum = useMemo(() => recipe?.ingredients.length, [recipe]);

  return (
    <Container maxWidth='md' disableGutters>
      {recipe && (
        <>
          <StyledImageWrapper src={recipe.imageURL ? recipe.imageURL : RecipeImg} alt='recipe' sx={{ borderRadius: '0 0 25px 25px' }} />
          <StyledGlassWrapper>
            <Typography variant='h1' sx={{ textAlign: 'center' }}>
              {recipe.title}
            </Typography>
            <Typography variant='body2' sx={{ textAlign: 'center', mt: 1 }}>
              {ingredientsNum} ингредиентов
            </Typography>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-around' }}>
              <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
                <ClockIcon height={20} width={20} />
                <Typography ml={0.5} variant='body2' component='span'>
                  {recipe.cookingTime} мин.
                </Typography>
              </Box>
              <Box sx={{ display: 'inline-flex', alignItems: 'center', ml: 1 }}>
                <DishIcon height={20} width={20} />
                <Typography ml={0.5} variant='body2' component='span'>
                  {recipe.portionsNum} порций
                </Typography>
              </Box>
            </Box>
          </StyledGlassWrapper>
          <Container sx={{ mt: 6 }}>
              <Typography variant='h2'>Ингредиенты</Typography>
              <List sx={{mt: 3, p: 0}}>
                {recipe.ingredients.map((ingredient) =>
                <IngredientListItem key={ingredient.id} ingredient={ingredient}/>
                )}
              </List>
            <Button variant="outlined" startIcon={<ContentCopyIcon />} sx={{mt: 2}}>Неотмеченные</Button>
          </Container>
          <Container sx={{ mt: 6 }}>
          <Typography variant='h2'>Инструкция приготовления</Typography>
          <Typography variant='body2' sx={{mt: 3}}>{recipe.instruction}</Typography>
          </Container>
        </>
      )}
    </Container>
  );
});


const IngredientListItem = ({ingredient}) => {
  const [checked, setChecked] = useState(false)
  return (
    <ListItem disablePadding divider>
      <ListItemButton role={undefined} onClick={() => setChecked(!checked)} dense sx={{px: 0, py: 2}}>
      <Box sx={{display: 'flex', alignItems: 'center', width: '100%'}}>
        <CheckBox disableRipple checked={checked} />
        <Typography sx={{ml: 1.5, fontWeight: 'fontWeightMedium'}}>{ingredient.title}</Typography>
        <Typography color= {checked ?'primary' : 'text'} sx={{ml: 'auto'}}>{ingredient.quantity} {(ingredient.units === 'другое') ? '' : ingredient.units}</Typography>
      </Box>
      </ListItemButton>
    </ListItem>
  )
}