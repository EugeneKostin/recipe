import { styled } from '@mui/system';

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

export const Input = ({ value, ...props }) => {
  return <StyledInput type='text' value={value} readOnly {...props} />;
};
