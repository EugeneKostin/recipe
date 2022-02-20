import { useContext, useState } from 'react';

import { Box, TextField, MenuItem, IconButton } from '@mui/material';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import { grey } from '@mui/material/colors';
import { CreateRecipeFormContext } from '../context';

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

export const IngredientItem = ({ ingredient, handleDeleteField }) => {
  const { formData, setFormData } = useContext(CreateRecipeFormContext);

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormData({
      ...formData,
      ingredients: formData.ingredients.map((element) =>
        element.id === ingredient.id ? { ...element, [name]: value } : element
      ),
    });
  };

  return (
    <Box
      sx={{
        mt: 2,
        px: 1,
        py: 2,
        bgcolor: grey[100],
        borderRadius: '5px',
      }}
    >
      <TextField
        sx={{ minWidth: '160px' }}
        variant='standard'
        label='Название'
        value={ingredient.title}
        onChange={handleChange}
        name='title'
        fullWidth
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 2,
        }}
      >
        <TextField
          sx={{ minWidth: '60px', mr: 1 }}
          label={ingredient.units}
          onChange={handleChange}
          name='quantity'
          value={ingredient.quantity}
          fullWidth
        />
        <TextField
          sx={{ minWidth: '80px' }}
          select
          label='Единицы'
          name='units'
          value={ingredient.units}
          onChange={handleChange}
          fullWidth
        >
          {quantitySelectors.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </TextField>
        <IconButton
          title='Удалить'
          onClick={() => handleDeleteField(ingredient.id)}
          color='primary'
          size='large'
        >
          <RemoveCircleOutlineOutlinedIcon fontSize='large' />
        </IconButton>
      </Box>
    </Box>
  );
};
