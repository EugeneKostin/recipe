import { Controller, useFormContext } from 'react-hook-form';
import { TextField } from '@mui/material';

const FormTextField = ({ name, defaultValue, children, helperText = ' ', ...props }) => {
  const { control } = useFormContext();
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
