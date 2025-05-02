import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

/**
 * AuthLayout is a simplified layout for authentication pages like login and register.
 * It removes the navigation, breadcrumbs, and footer to create a focused experience.
 */
const AuthLayout = () => {
  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        width: '100%',
      }}
    >
      <Box 
        component="main" 
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AuthLayout;