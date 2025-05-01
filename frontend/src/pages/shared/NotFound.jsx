import React from 'react';
import { Box, Container, Typography, Button, Paper, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Home as HomeIcon, Search as SearchIcon } from '@mui/icons-material';

const NotFound = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Container maxWidth="lg">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="90vh"
        textAlign="center"
      >
        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, md: 8 },
            borderRadius: 4,
            bgcolor: 'background.paper',
            maxWidth: 600,
            width: '100%',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 4,
              background: (theme) =>
                `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            },
          }}
        >
          <Box mb={6}>
            <SearchIcon
              sx={{
                fontSize: 120,
                color: 'action.disabled',
                mb: 2,
                animation: 'float 3s ease-in-out infinite',
                '@keyframes float': {
                  '0%, 100%': {
                    transform: 'translateY(0)',
                  },
                  '50%': {
                    transform: 'translateY(-10px)',
                  },
                },
              }}
            />
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '4rem', sm: '6rem' },
                fontWeight: 'bold',
                background: (theme) =>
                  `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                backgroundClip: 'text',
                textFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2,
              }}
            >
              404
            </Typography>
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                mb: 2,
              }}
            >
              Page non trouvée
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                mb: 4,
                maxWidth: 400,
                mx: 'auto',
                lineHeight: 1.7,
              }}
            >
              Désolé, la page que vous recherchez semble avoir disparu dans le cyberespace.
              Peut-être a-t-elle été déplacée ou n'existe plus.
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
              justifyContent: 'center',
            }}
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<HomeIcon />}
              onClick={() => navigate('/')}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 2,
                transition: 'all 0.2s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: (theme) => theme.shadows[4],
                },
              }}
            >
              Retour à l'accueil
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate(-1)}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 2,
                '&:hover': {
                  borderColor: 'primary.main',
                  bgcolor: 'primary.light',
                },
              }}
            >
              Page précédente
            </Button>
          </Box>
        </Paper>

        <Box 
          sx={{ 
            mt: 4,
            p: 2,
            borderRadius: 2,
            bgcolor: 'action.hover',
            maxWidth: 'fit-content',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Besoin d'aide ? {' '}
            <Button
              color="primary"
              size="small"
              onClick={() => navigate('/contact')}
              sx={{ 
                textTransform: 'none',
                fontWeight: 'medium',
                '&:hover': {
                  bgcolor: 'transparent',
                  textDecoration: 'underline',
                },
              }}
            >
              Contactez-nous
            </Button>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default NotFound;