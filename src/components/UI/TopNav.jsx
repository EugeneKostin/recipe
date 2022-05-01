import {
  AppBar,
  Toolbar,
  Typography,
  Stack,
  Container,
  useScrollTrigger,
  useTheme,
  useMediaQuery,
  Tabs,
  Tab,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
import { PAGE_RECIPES_PATH } from '../../utils/constants';

export const TopNav = ({ menuItems }) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 200,
  });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AppBar
      position={trigger ? 'fixed' : 'absolute'}
      color={trigger ? 'secondary' : 'transparent'}
      elevation={trigger ? 3 : 0}
      sx={{
        transition: (theme) =>
          theme.transitions.create(['box-shadow', 'color'], {
            duration: theme.transitions.duration.shortest,
          }),
        borderBottom: isMobile && 1,
        borderColor: isMobile && 'divider',
      }}>
      <Container>
        <Toolbar disableGutters sx={{ justifyContent: { xs: 'center', md: 'space-between' } }}>
          <Typography
            variant='h4'
            noWrap
            component={RouterLink}
            to={PAGE_RECIPES_PATH}
            sx={{
              mx: { xs: 0, md: '3vw' },
              fontFamily: '"Lobster", sans-serif',
              letterSpacing: '.05em',
              color: 'primary.main',
              textDecoration: 'none',
            }}>
            Recipe App
          </Typography>
          {!isMobile && (
            <Stack direction={'row'}>
              <NavList navItems={menuItems} linkColor={trigger ? 'white' : 'default'} />
            </Stack>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

const NavList = ({ navItems, linkColor }) => {
  const { pathname } = useLocation();
  const [value, setValue] = useState(0);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  useEffect(() => setValue(navItems.find((item) => pathname.includes(item.url)).id), [navItems, pathname]);

  return (
    <Tabs value={value} onChange={handleChange} aria-label='top nav'>
      {navItems.map(({ id, url, label }) => (
        <Tab key={id} disableRipple component={RouterLink} sx={{ color: linkColor }} to={url} label={label} />
      ))}
    </Tabs>
  );
};
