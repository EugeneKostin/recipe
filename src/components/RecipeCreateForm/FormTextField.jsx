import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

const FormTextField = ({ name, control, defaultValue, children, helperText = '', ...props }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <TextField {...field} {...props} error={!!error} helperText={error ? error.message : helperText}>
          {children}
        </TextField>
      )}
    />
  );
};

export default FormTextField;
