import { TransitionGroup } from 'react-transition-group';
import throttle from 'lodash/throttle';

import { Box, Collapse, IconButton } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useFieldArray } from 'react-hook-form';
import FormIngredientItem from './FormIngredientItem';
import { useEffect } from 'react';

const FormIngredientField = ({ control }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ingredients',
  });

  const handleAddField = () => {
    append({
      title: '',
      quantity: '',
      units: 'гр.',
    });
  };

  const throttledAddButtonClick = throttle(handleAddField, 5000);

  const handleFieldDelete = (removedFieldIndex) => {
    fields.length > 1 && remove(removedFieldIndex);
  };

  return (
    <Box>
      <TransitionGroup>
        {fields.map((ingredient, index) => (
          <Collapse key={ingredient.id}>
            <FormIngredientItem
              control={control}
              ingredient={ingredient}
              index={index}
              handleFieldDelete={handleFieldDelete}
            />
          </Collapse>
        ))}
      </TransitionGroup>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 2,
        }}>
        <IconButton title='Добавить' onClick={throttledAddButtonClick} color='primary' size='large'>
          <AddCircleOutlineOutlinedIcon fontSize='large' />
        </IconButton>
      </Box>
    </Box>
  );
};

export default FormIngredientField;
