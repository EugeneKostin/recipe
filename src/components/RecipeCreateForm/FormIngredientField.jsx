import throttle from 'lodash/throttle';

import { Box, IconButton } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useFieldArray, useFormContext } from 'react-hook-form';
import FormIngredientItem from './FormIngredientItem';
import { useEffect, useMemo } from 'react';

const FormIngredientField = () => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ingredients',
  });

  useEffect(() => {
    return () => {
      throttledAddButtonClick.cancel();
    };
  }, []);

  const handleAddField = () => {
    append({
      title: '',
      quantity: '',
      units: 'гр.',
    });
  };

  const throttledAddButtonClick = useMemo(() => throttle(handleAddField, 500), []);

  const handleFieldDelete = (removedFieldIndex) => {
    remove(removedFieldIndex);
  };

  return (
    <Box>
      {fields.map((ingredient, index) => (
        <FormIngredientItem key={ingredient.id} {...{ control, index, ingredient, handleFieldDelete }} />
      ))}
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
