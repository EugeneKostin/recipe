import { styled } from '@mui/material/styles';
import { IconButton } from '@mui/material';

const StyledButton = styled(IconButton)(({ theme }) => ({
  borderRadius: 8,
  padding: 0,
  backgroundColor: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
  '.MuiSvgIcon-root': {
    color: theme.palette.common.white,
    height: '70%',
    width: '70%',
  },
  [theme.breakpoints.up('xs')]: {
    width: 55,
    height: 55,
  },
  [theme.breakpoints.up('md')]: {
    width: 75,
    height: 75,
  },
}));

export default function ImageUploadButton({ children, ...props }) {
  return <StyledButton {...props}>{children}</StyledButton>;
}
