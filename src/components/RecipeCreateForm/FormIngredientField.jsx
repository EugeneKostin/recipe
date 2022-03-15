import { TransitionGroup } from 'react-transition-group';
import throttle from 'lodash/throttle';

import { Box, Collapse, IconButton } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useFieldArray } from 'react-hook-form';
import FormIngredientItem from './FormIngredientItem';

const FormIngredientField = ({ control }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ingredients',
  });

  const handleAddField = () => {
    console.log('add');
    append({
      title: '',
      quantity: '',
      units: 'гр.',
    });
  };

  const throttledAddButtonClick = throttle(handleAddField, 5000);

  const handleFieldDelete = (removedFieldIndex) => {
    console.log('remove');
    fields.length > 1 && remove(removedFieldIndex);
  };

  console.log('render');
  return (
    <Box>
      <TransitionGroup>
        {fields.map((ingredient, index) => (
          <Collapse key={ingredient.id}>
            <FormIngredientItem {...{ control, index, ingredient, handleFieldDelete }} />
          </Collapse>
        ))}
      </TransitionGroup>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 2,
        }}>
        <IconButton title='Добавить' onClick={handleAddField} color='primary' size='large'>
          <AddCircleOutlineOutlinedIcon fontSize='large' />
        </IconButton>
      </Box>
    </Box>
  );
};

export default FormIngredientField;
