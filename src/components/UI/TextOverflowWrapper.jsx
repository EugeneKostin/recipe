import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const TextOverflowBox = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'multiline' && prop !== 'overflowColor',
})(({ theme, multiline, overflowColor = theme.palette.background.default }) => ({
  position: 'relative',
  width: '100%',
  textOverflow: 'clip',
  overflow: 'hidden',
  display: 'inline-flex',
  whiteSpace: multiline ? 'normal' : 'nowrap',
  '&:before': {
    content: "''",
    width: multiline ? '100%' : '20px',
    height: multiline ? '5px' : '100%',
    position: 'absolute',
    right: 0,
    bottom: 0,
    background: multiline
      ? `linear-gradient(180deg, transparent, ${overflowColor})`
      : `linear-gradient(90deg, transparent, ${overflowColor})`,
  },
}));

export default function TextOverflowWrapper({ children, multiline = false, overflowColor = null, ...props }) {
  return (
    <TextOverflowBox {...{ multiline, overflowColor }} {...props}>
      {children}
    </TextOverflowBox>
  );
}
