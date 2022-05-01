import { useCallback, useEffect, useState } from 'react';
import { Box, MenuItem, IconButton, Collapse, Paper, Stack, Typography } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
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

const FormIngredientItem = ({ index, control, handleFieldDelete }) => {
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
          px: { xs: 1, md: 2 },
          pt: { xs: 6, md: 6 },
          pb: { xs: 1, md: 2 },
          position: 'relative',
        }}>
        <Box
          sx={{
            position: 'absolute',
            top: 12,
            left: 12,
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
          sx={{ color: 'primary.main', height: 'fit-content', position: 'absolute', top: 0, right: 0 }}>
          <CloseIcon sx={{ fontSize: { xs: '2.4rem', md: '3rem' } }} />
        </IconButton>
        <FormTextField
          name={`ingredients.${index}.title`}
          control={control}
          label='Название'
          variant='standard'
          fullWidth
          sx={{ minWidth: '160px' }}
        />
        <Stack
          sx={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            mt: 1,
          }}>
          <FormTextField
            name={`ingredients.${index}.quantity`}
            control={control}
            label='Кол-во'
            fullWidth
            sx={{ minWidth: '60px', mr: 1 }}
          />
          <FormTextField
            name={`ingredients.${index}.units`}
            control={control}
            select
            label='единицы'
            fullWidth
            sx={{ minWidth: '80px' }}>
            {quantitySelectors.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </FormTextField>
        </Stack>
      </Paper>
    </Collapse>
  );
};

export default FormIngredientItem;
