import { useContext, useState } from 'react';
import { TransitionGroup } from 'react-transition-group';
import throttle from 'lodash/throttle';

import { Box, Collapse, IconButton } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

import { IngredientItem } from './IngredientItem';
import { CreateRecipeFormContext } from '../context';

export const IngredientField = () => {
  // const [ingredientFieldsIds, setIngredientFieldsIds] = useState([0]);
  const { formData, setFormData } = useContext(CreateRecipeFormContext);

  const handleAddField = () => {
    setFormData({
      ...formData,
      ingredients: [
        ...formData.ingredients,
        {
          id: formData.ingredients.length,
          title: '',
          quantity: '',
          units: 'гр.',
        },
      ],
    });
    console.log(formData);
  };
  const throttledAddButtonClick = throttle(handleAddField, 5000);

  const handleDeleteField = (removedFieldId) => {
    const filteredIngredients = formData.ingredients.filter(
      (ingredient) => ingredient.id !== removedFieldId
    );
    console.log(removedFieldId, filteredIngredients);
    setFormData({ ...formData, ingredients: filteredIngredients });
  };

  return (
    <Box>
      <TransitionGroup>
        {formData.ingredients.map((ingredient) => (
          <Collapse key={ingredient.id}>
            <IngredientItem
              ingredient={ingredient}
              handleDeleteField={handleDeleteField}
            />
          </Collapse>
        ))}
      </TransitionGroup>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 2,
        }}
      >
        <IconButton
          title='Добавить'
          onClick={throttledAddButtonClick}
          color='primary'
          size='large'
        >
          <AddCircleOutlineOutlinedIcon fontSize='large' />
        </IconButton>
      </Box>
    </Box>
  );
};
