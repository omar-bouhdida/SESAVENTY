import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="80vh"
      textAlign="center"
      p={3}
    >
      <Typography variant="h2" color="error" gutterBottom>
        Accès non autorisé
      </Typography>
      <Typography variant="h6" color="textSecondary" paragraph>
        Vous n'avez pas les permissions nécessaires pour accéder à cette page.
      </Typography>
      <Box mt={4}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(from === '/unauthorized' ? '/' : from)}
          sx={{ mr: 2 }}
        >
          Retour
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate('/')}
        >
          Page d'accueil
        </Button>
      </Box>
    </Box>
  );
};

export default Unauthorized;