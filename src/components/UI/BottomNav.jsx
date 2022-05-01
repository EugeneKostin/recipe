import { Box, BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { NavLink as RouterLink } from 'react-router-dom';

export const BottomNav = ({ menuItems }) => {
  return (
    <Paper
      sx={{
        display: { xs: 'block', md: 'none' },
        width: '100%',
        position: 'fixed',
        zIndex: 'appBar',
        bottom: 0,
        left: 0,
        right: 0,
      }}
      elevation={3}>
      <Box sx={{ width: '100%' }}>
        <BottomNavigation showLabels>
          {menuItems.map((page) => (
            <BottomNavigationAction
              key={page.id}
              component={RouterLink}
              to={page.url}
              label={page.label}
              icon={page.icon}
              sx={{ '&.active': { color: 'primary.main' } }}
            />
          ))}
        </BottomNavigation>
      </Box>
    </Paper>
  );
};
