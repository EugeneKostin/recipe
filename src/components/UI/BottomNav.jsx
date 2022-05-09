import {BottomNavigation, BottomNavigationAction, Box, Paper} from '@mui/material';
import {NavLink as RouterLink, useLocation} from 'react-router-dom';
import {useEffect, useState} from "react";

export const BottomNav = ({menuItems}) => {
  const {pathname} = useLocation();
  const [value, setValue] = useState(0);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  useEffect(() => setValue(menuItems.find((item) => pathname.includes(item.url)).id), [menuItems, pathname]);

  return (
    <Paper
      sx={{
        display: {xs: 'block', md: 'none'},
        width: '100%',
        position: 'fixed',
        zIndex: 'appBar',
        bottom: 0,
        left: 0,
        right: 0,
      }}
      elevation={3}>
      <Box sx={{ width: '100%' }}>
        <BottomNavigation showLabels value={value} onChange={handleChange}>
          {menuItems.map((page) => (
            <BottomNavigationAction
              key={page.id}
              component={RouterLink}
              to={page.url}
              label={page.label}
              icon={page.icon}
              sx={{'&.active': {color: 'primary.main'}}}
            />
          ))}
        </BottomNavigation>
      </Box>
    </Paper>
  );
};
