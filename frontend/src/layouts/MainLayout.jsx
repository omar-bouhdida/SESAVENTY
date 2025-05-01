import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navigation from '../components/common/Navigation';
import Footer from '../components/common/Footer';
import { useAuth } from '../contexts/AuthContext';

const MainLayout = () => {
  const { user } = useAuth();

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navigation />
      <Box component="main" flexGrow={1} mt={8}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default MainLayout;