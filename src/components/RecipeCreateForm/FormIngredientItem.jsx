import { useCallback, useEffect, useState } from 'react';

import { Box, MenuItem, IconButton, Collapse } from '@mui/material';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
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

const FormIngredientItem = ({ ingredient, index, control, handleFieldDelete }) => {
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
      <Box
        sx={{
          mt: 2,
          px: 1,
          py: 2,
          bgcolor: 'grey.50',
          borderRadius: '5px',
        }}>
        <FormTextField
          name={`ingredients.${index}.title`}
          control={control}
          label='Название'
          variant='standard'
          fullWidth
          sx={{ minWidth: '160px' }}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 2,
          }}>
          <FormTextField
            name={`ingredients.${index}.quantity`}
            control={control}
            label={ingredient.units}
            fullWidth
            sx={{ minWidth: '60px', mr: 1 }}
          />
          <FormTextField
            name={`ingredients.${index}.units`}
            control={control}
            select
            label={ingredient.units}
            fullWidth
            sx={{ minWidth: '80px' }}>
            {quantitySelectors.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </FormTextField>
          <IconButton title='Удалить' onClick={handleTransitionedUnmount} color='primary' size='large'>
            <RemoveCircleOutlineOutlinedIcon fontSize='large' />
          </IconButton>
        </Box>
      </Box>
    </Collapse>
  );
};

export default FormIngredientItem;
