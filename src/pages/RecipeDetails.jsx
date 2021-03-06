import {
  Alert,
  Box,
  Button,
  Container,
  List,
  ListItem,
  ListItemButton,
  Paper,
  Snackbar,
  Stack,
  Tooltip,
  Typography
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {memo, useEffect, useMemo, useState} from 'react';
import {useParams} from 'react-router-dom';
import {getDocumentById} from '../API/firestore';
import Image from '../components/UI/Image';
import {ReactComponent as ClockIcon} from '../static/icons/clock.svg';
import {ReactComponent as DishIcon} from '../static/icons/dish.svg';
import CheckBox from '../components/UI/CheckBox';
import {alpha, styled} from '@mui/material/styles';
import RecipeImg from '../static/images/recipe.png';
import uniqueId from 'lodash/uniqueId';
import {INGREDIENT_NUM_WORDS, PORTIONS_NUM_WORDS} from '../utils/constants';
import {getNumWord} from '../utils/helpers';
import {Loader} from "../components/UI/Loader";

const StyledImageWrapper = styled(Image)(({theme}) => ({
  maxHeight: 240,
  position: 'relative', '&:before': {
    content: "''",
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.4,
    // background: `linear-gradient(0deg, ${theme.palette.primary.main}, ${theme.palette.background.default} 70%)`,
    background: `linear-gradient(0deg, ${theme.palette.primary.main}, transparent 60%)`,
  }, [theme.breakpoints.up('sm')]: {
    maxHeight: 350,
  }, [theme.breakpoints.up('md')]: {
    maxHeight: 450,
  },
}));

const StyledGlassWrapper = styled(Paper)(({theme}) => ({
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
  boxShadow: '2px 2px 6px rgba(0, 0, 0, 0.1), inset 1px 1px 4px rgba(255, 255, 255, 0.05), inset -1px -1px 4px rgba(255, 87, 34, 0.05)',
}));

export const RecipeDetails = memo(() => {
  const {id: recipeId} = useParams();
  const [recipe, setRecipe] = useState(null);

  const ingredientsNum = useMemo(() => recipe?.ingredients.length, [recipe]);

  useEffect(() => {
    (async () => {
      const data = await getDocumentById(recipeId);
      setRecipe(data);
    })();
  }, [recipeId]);

  return (<Container maxWidth='md' sx={{pb: 8}}>
    {recipe ? (<>
      <StyledImageWrapper
        src={recipe.imageURL ? recipe.imageURL : RecipeImg}
        alt='recipe'
        sx={{borderRadius: {xs: 4, md: 8}, mt: 4}}
      />
      <StyledGlassWrapper>
        <Typography variant='h1' sx={{textAlign: 'center'}}>
          {recipe.title}
        </Typography>
        <Typography variant='body2' sx={{textAlign: 'center', mt: 1}}>
          {ingredientsNum} {getNumWord(ingredientsNum, INGREDIENT_NUM_WORDS)}
        </Typography>
        <Box sx={{mt: 2, display: 'flex', justifyContent: 'space-around'}}>
          <Box sx={{display: 'inline-flex', alignItems: 'center'}}>
            <ClockIcon height={20} width={20}/>
            <Typography ml={1} variant='body2' component='span'>
              {recipe.cookingTime} ??????.
            </Typography>
          </Box>
          <Box sx={{display: 'inline-flex', alignItems: 'center', ml: 1}}>
            <DishIcon height={20} width={20}/>
            <Typography ml={1} variant='body2' component='span'>
              {recipe.portionsNum} {getNumWord(recipe.portionsNum, PORTIONS_NUM_WORDS)}
            </Typography>
          </Box>
        </Box>
      </StyledGlassWrapper>
      <Container disableGutters sx={{mt: {xs: 6, md: 8}}}>
        <Typography variant='h2'>??????????????????????</Typography>
        <IngredientsList ingredients={recipe.ingredients}/>
      </Container>
      <Container disableGutters sx={{mt: {xs: 6, md: 8}}}>
        <Typography variant='h2'>???????????????????? ??????????????????????????</Typography>
        <Stack spacing={{xs: 6, md: 8}} sx={{mt: {xs: 4, md: 6}}}>
          {recipe.instructionSteps.map((step, index) => (
            <InstructionStepsItem key={uniqueId()} {...{step, index}}/>
          ))}
        </Stack>
      </Container>
    </>) : <Loader sx={{height: '80vh'}}/>}
  </Container>);
});

const IngredientsList = ({ingredients}) => {
  const [checkedIngredients, setCheckedIngredients] = useState([])
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    ingredients && setCheckedIngredients(new Array(ingredients.length).fill(false))
  }, [ingredients])

  const handleCopyClick = () => {
    navigator.clipboard.writeText(ingredients.reduce((acc, {
      title,
      quantity,
      units
    }, index) => !checkedIngredients[index]
      ? acc.concat(`${title} - ${quantity + (units === '????????????' ? '' : (' ' + units))}\n`)
      : acc, '')).then(() => setSnackbarOpen(true), (err) => console.error({clipboardErr: err}))
  }

  const handleIngredientClick = (position) => {
    const updatedCheckedState = checkedIngredients.map((item, index) => index === position ? !item : item);
    setCheckedIngredients(updatedCheckedState);
  }

  const handleSnackbarClose = () => setSnackbarOpen(false)

  return (<>
    <List sx={{mt: 3, p: 0}}>
      {ingredients.map((ingredient, index) => (
        <IngredientsItem key={uniqueId()} ingredient={ingredient} checked={checkedIngredients[index]}
                         index={index} onClick={handleIngredientClick}/>))}
    </List>
    <Tooltip title='?????????????????????? ???????????????????????? ??????????????????????'>
      <Button variant='outlined' onClick={handleCopyClick} startIcon={<ContentCopyIcon/>} sx={{mt: 2}}>
        ????????????????????????
      </Button>
    </Tooltip>
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={3000}
      onClose={handleSnackbarClose}
      sx={{'&': {bottom: {xs: 64, md: 24}}}}
    >
      <Alert color="primary" onClose={handleSnackbarClose} sx={{
        alignItems: 'center',
        lineHeight: 1,
        '&.MuiAlert-action': {
          padding: '0 0 0 16px'
        }
      }}>
        ??????????????????????
      </Alert>
    </Snackbar>
  </>)
}

const IngredientsItem = ({ingredient, index, onClick, checked}) => {

  const handleClick = () => onClick(index)

  return (<ListItem disablePadding divider>
    <ListItemButton role={undefined} onClick={handleClick} dense sx={{px: 0, py: 2}}>
      <Box sx={{display: 'flex', alignItems: 'center', width: '100%', px: {md: 2}}}>
        <CheckBox disableRipple checked={checked}/>
        <Typography sx={{ml: 1.5, fontWeight: 'fontWeightMedium'}}>{ingredient.title}</Typography>
        <Typography color={checked ? 'primary' : 'text'} sx={{ml: 'auto'}}>
          {ingredient.quantity} {ingredient.units === '????????????' ? '' : ingredient.units}
        </Typography>
      </Box>
    </ListItemButton>
  </ListItem>);
};

const InstructionStepsItem = ({step, index}) => (
  <Stack spacing={{xs: 2, md: 3}}>
    <Box sx={{
      py: {xs: .5, md: 1},
      px: {xs: 1, md: 2},
      backgroundColor: 'primary.main',
      color: 'background.default',
      width: 'fit-content',
      borderRadius: 1
    }}>
      <Typography component={'span'} whiteSpace={'nowrap'}>
        ?????? {index + 1}
      </Typography>
    </Box>
    {step.imageURL &&
      <Image src={step.imageURL} sx={{borderRadius: 2, height: {xs: '60vmin', md: '70vmin', xl: '60vmin'}}}
             alt='instruction step'/>
    }
    <Typography>
      {step.description}
    </Typography>
  </Stack>)