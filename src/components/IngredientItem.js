import React, { useState } from "react";

import { Box, TextField, MenuItem, IconButton } from '@mui/material';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import { grey } from '@mui/material/colors';

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

export const IngredientItem = (props) => {
  const [quantityLabel, setQuantityLabel] = useState('гр.');

  const handleLabelChange = (e) => {
    setQuantityLabel(e.target.value)
  }

  const handleChange = (e) => {
    const value = e.target.value;
    const id = props.id;
    const name = e.target.name;
    console.log(id, name, value);
    // props.setControl(prevState => ({
    // 	...prevState, ['products']: {
    // 		...prevState['products'], [id]: {
    // 			...prevState['products'][id], [name]: value
    // 		}
    // 	}
    // }));

    // ГОВНО МАССИВ НАДО ЧТОБЫ ОБЪЕКТ В МАССИВЕ ИЗМЕНЯЛСЯ
    console.log(props.control['products'][0][name]);
    props.setControl(prevState => ({
      ...prevState, ['products']: [
        ...prevState['products'], prevState['products'][0] = {
          ...prevState['products'][0], [name]: value
        }
      ]
    }));
  }
  return (
    <Box sx={{
      mt: 2,
      px: 1,
      py: 2,
      bgcolor: grey[100],
      borderRadius: '5px'
    }} >
      <TextField sx={{ minWidth: '160px' }}
        variant="standard"
        label="Название"
        onChange={handleChange}
        name="title"
        fullWidth
      />
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mt: 2,
      }} >
        <TextField sx={{ minWidth: '60px', mr: 1 }}
          label={quantityLabel}
          onChange={handleChange}
          name="quantity"
          fullWidth
        />
        <TextField sx={{ minWidth: '80px' }}
          select
          label="Единицы"
          value={quantityLabel}
          name="units"
          onChange={(e) => { handleLabelChange(e); handleChange(e) }}
          fullWidth
        >
          {quantitySelectors.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </TextField>
        <IconButton
          title="Удалить"
          onClick={() => props.handleDeleteField(props.id)}
          color="primary"
          size="large"
        >
          <RemoveCircleOutlineOutlinedIcon fontSize="large" />
        </IconButton>
      </Box>
    </Box>
  )
};
