import { styled } from '@mui/system';
import { ButtonGroup, IconButton, InputBase } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Controller, useFormContext } from 'react-hook-form';

const StyledInput = styled(InputBase)(({ theme }) => ({
  border: 'none',
  width: 30,
  height: '100%',
  padding: 0,
  outline: 'none',
  '& .MuiInputBase-input': {
    textAlign: 'center',
  },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  height: '100%',
  width: 56,
  color: theme.palette.primary.main,
  borderRadius: 0,
}));

const FormInputNumWithControls = ({ name, defaultValue, sx, ...props }) => {
  const { control, setValue } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <ButtonGroup
          aria-label='portions field'
          {...props}
          sx={{
            border: 1,
            borderRadius: 1,
            borderColor: 'rgba(0, 0, 0, 0.23)',
            height: 56,
            alignItems: 'center',
            justifyContent: 'space-between',
            ...sx,
          }}>
          <StyledIconButton aria-label='reduce' onClick={() => setValue(name, field.value - 1)}>
            <RemoveIcon />
          </StyledIconButton>
          <StyledInput {...field} type='text' readOnly />
          <StyledIconButton aria-label='add' onClick={() => setValue(name, field.value + 1)}>
            <AddIcon />
          </StyledIconButton>
        </ButtonGroup>
      )}
    />
  );
};

export default FormInputNumWithControls;
