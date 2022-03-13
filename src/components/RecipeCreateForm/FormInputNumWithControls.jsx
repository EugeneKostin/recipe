import { styled } from '@mui/system';
import { ButtonGroup, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Controller } from 'react-hook-form';

const StyledInput = styled('input')(({ theme }) => ({
  border: 'none',
  width: 32,
  textAlign: 'center',
  padding: 0,
  color: theme.palette.text.primary,
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: '1rem',
  fontFamily: theme.typography.fontFamily,
}));

const FormInputNumWithControls = ({ name, control, setValue, defaultValue, ...props }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <ButtonGroup aria-label='portions field'>
          <IconButton aria-label='reduce' onClick={() => setValue(name, field.value - 1)} color='primary'>
            <RemoveIcon />
          </IconButton>
          <StyledInput {...field} {...props} type='text' readOnly />
          <IconButton aria-label='add' onClick={() => setValue(name, field.value + 1)} color='primary'>
            <AddIcon />
          </IconButton>
        </ButtonGroup>
      )}
    />
  );
};

export default FormInputNumWithControls;
