import { useCallback, useEffect, useState } from 'react';
import { Box, MenuItem, IconButton, Collapse, Paper, Stack, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FormTextField from './FormTextField';

const quantitySelectors = [
  {
    value: 'гр.',
    label: 'гр.',
  },
  {
    value: 'ч.л',
    label: 'ч.л',
  },
  {
    value: 'ст.л',
    label: 'ст.л',
  },
  {
    value: 'шт.',
    label: 'шт.',
  },
  {
    value: 'ст.',
    label: 'ст.',
  },
  {
    value: 'другое',
    label: 'другое',
  },
];
const transitionDuration = 250;

const FormIngredientItem = ({ index, handleFieldDelete }) => {
  const [mounted, setMounted] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleTransitionedUnmount = useCallback(() => {
    setMounted(false);
    setTimeout(() => handleFieldDelete(index), transitionDuration);
  }, [index, handleFieldDelete]);

  return (
    <Collapse in={mounted} timeout={transitionDuration}>
      <Paper
        elevation={3}
        // variant='outlined'
        sx={{
          mt: 2,
          p: { xs: 1, md: 2 },
          position: 'relative',
        }}>
      <Stack spacing={{xs: 2, md: 3}}>
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} width={'100%'}>
          <Box
            sx={{
              width: 24,
              height: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 1,
              borderRadius: '50%',
            }}>
            <Typography variant={'caption'} fontWeight={'bold'}>
              {index + 1}
            </Typography>
          </Box>
          <IconButton
            title='Удалить'
            onClick={handleTransitionedUnmount}
            size='large'
            sx={{ color: 'primary.main', height: 'fit-content', p: 0 }}>
            <CloseIcon sx={{ fontSize: { xs: '2.4rem', md: '3rem' } }} />
          </IconButton>
        </Stack>
        <FormTextField
          name={`ingredients.${index}.title`}
          label='Название'
          variant='standard'
          fullWidth
        />
        <Stack
          sx={{
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <FormTextField
            name={`ingredients.${index}.quantity`}
            label='Кол-во'
            size={'small'}
            fullWidth
            sx={{ minWidth: '60px', mr: 1 }}
          />
          <FormTextField
            name={`ingredients.${index}.units`}
            select
            label='единицы'
            size={'small'}
            fullWidth
            sx={{ minWidth: '80px' }}>
            {quantitySelectors.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </FormTextField>
        </Stack>
      </Stack>
      </Paper>
    </Collapse>
  );
};

export default FormIngredientItem;
