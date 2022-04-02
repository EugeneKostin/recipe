import throttle from 'lodash/throttle';
import { Box, IconButton, FormHelperText } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import { useFieldArray, useFormContext } from 'react-hook-form';
import FormIngredientItem from './FormIngredientItem';
import { useEffect, useMemo, useCallback } from 'react';

const FormIngredientField = () => {
  const { control, formState: { errors }, clearErrors } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ingredients',
  });

  const handleAddField = useCallback( () => {
    clearErrors()
      append({
        title: '',
        quantity: '',
        units: 'гр.',
      })},
    [append, clearErrors]
  );
  const throttledAddButtonClick = useMemo(() => throttle(handleAddField, 500), [handleAddField]);

  const handleFieldDelete = (removedFieldIndex) => {
    remove(removedFieldIndex);
  };

  useEffect(() => {
    return () => {
      throttledAddButtonClick.cancel();
    };
  }, [throttledAddButtonClick]);

  return (
    <Box>
      {fields.map((ingredient, index) => (
        <FormIngredientItem key={ingredient.id} {...{ control, index, ingredient, handleFieldDelete }} />
      ))}
      {errors?.ingredients?.message && <FormHelperText error sx={{ml:2, mt: 2, display: 'flex', alignItems: 'center'}}><SentimentDissatisfiedIcon sx={{mr: 1}}/>{errors?.ingredients?.message}</FormHelperText>}
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
