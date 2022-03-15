import { useCallback } from 'react';

import { Box, MenuItem, IconButton } from '@mui/material';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import { grey } from '@mui/material/colors';
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

const FormIngredientItem = ({ ingredient, index, control, handleFieldDelete }) => {
  const handleDelete = useCallback(() => handleFieldDelete(index), [index, handleFieldDelete]);

  return (
    <Box
      sx={{
        mt: 2,
        px: 1,
        py: 2,
        bgcolor: grey[100],
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
        <IconButton title='Удалить' onClick={handleDelete} color='primary' size='large'>
          <RemoveCircleOutlineOutlinedIcon fontSize='large' />
        </IconButton>
      </Box>
    </Box>
  );
};

export default FormIngredientItem;
