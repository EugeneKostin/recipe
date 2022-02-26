import { grey } from '@mui/material/colors';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  ListItemText,
  MenuList,
  MenuItem,
} from '@mui/material';
import { NavLink as RouterLink } from 'react-router-dom';

export const TopNav = ({ menuItems }) => {
  return (
    <AppBar position='absolute'>
      <Container maxWidth='false'>
        <Toolbar
          disableGutters
          sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }}
        >
          <Typography
            variant='h6'
            noWrap
            component='span'
            sx={{
              mr: { xs: 0, md: '5vw' },
              ml: { xs: 0, md: '5vw' },
              letterSpacing: '.05em',
              textTransform: 'uppercase',
            }}
          >
            Recipe APP
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex', justifyContent: 'flex-end' },
            }}
          >
            <MenuList component='nav' sx={{ display: 'flex', p: 0 }}>
              {menuItems.map((menuItem) => (
                <li key={menuItem.id}>
                  <MenuItem
                    sx={{
                      px: '5vw',
                      py: 2,
                      color: grey[100],
                      letterSpacing: '0.1em',
                      '&.active': {
                        color: 'white',
                        fontWeight: 'fontWeightBold',
                        letterSpacing: '0.2em',
                      },
                    }}
                    component={RouterLink}
                    to={menuItem.url}
                  >
                    {menuItem.label}
                  </MenuItem>
                </li>
              ))}
            </MenuList>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
