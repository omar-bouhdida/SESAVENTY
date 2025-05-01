import React from 'react';
import { Box, Container } from '@mui/material';
import { useLocation, Outlet } from 'react-router-dom';
import Navigation from '../components/common/Navigation';
import Breadcrumbs from '../components/common/Breadcrumbs';
import Footer from '../components/common/Footer';
import { useAuth } from '../contexts/AuthContext';

const MainLayout = () => {
  const { user } = useAuth();
  const location = useLocation();
  const isAuthPage = location.pathname.includes('/login') || location.pathname.includes('/register');

  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        width: '100%',
      }}
    >
      <Navigation />
      <Box 
        component="main" 
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          pt: '64px', // Height of AppBar
          pb: 4,
        }}
      >
        {!isAuthPage && <Breadcrumbs />}
        <Container 
          maxWidth="lg" 
          sx={{ 
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            py: { xs: 2, sm: 3 },
          }}
        >
          <Outlet />
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default MainLayout;