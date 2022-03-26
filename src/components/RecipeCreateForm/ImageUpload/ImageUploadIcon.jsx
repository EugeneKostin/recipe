import { styled } from '@mui/material/styles';
import { Icon } from '@mui/material';

const StyledIcon = styled(Icon)(({ theme }) => ({
  borderRadius: '50%',
  padding: 0,
  backgroundColor: theme.palette.primary.main,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '.MuiSvgIcon-root': {
    color: theme.palette.common.white,
    height: '60%',
    width: '60%',
  },
  [theme.breakpoints.up('xs')]: {
    width: 45,
    height: 45,
  },
  [theme.breakpoints.up('md')]: {
    width: 60,
    height: 60,
  },
}));

export default function ImageUploadIcon({ children, ...props }) {
  return <StyledIcon {...props}>{children}</StyledIcon>;
}
