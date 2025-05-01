import React from 'react';
import { Box, Container, Typography, Button, Paper, useTheme } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Lock as LockIcon,
  ArrowBack as ArrowBackIcon,
  Home as HomeIcon,
  HelpOutline as HelpOutlineIcon,
} from '@mui/icons-material';

const Unauthorized = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const from = location.state?.from?.pathname || '/';

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
                `linear-gradient(90deg, ${theme.palette.error.main}, ${theme.palette.error.light})`,
            },
          }}
        >
          <Box mb={6}>
            <Box
              sx={{
                position: 'relative',
                width: 120,
                height: 120,
                mx: 'auto',
                mb: 4,
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  bgcolor: 'error.light',
                  opacity: 0.2,
                  animation: 'pulse 2s ease-in-out infinite',
                  '@keyframes pulse': {
                    '0%': {
                      transform: 'translate(-50%, -50%) scale(0.95)',
                      opacity: 0.2,
                    },
                    '50%': {
                      transform: 'translate(-50%, -50%) scale(1.05)',
                      opacity: 0.3,
                    },
                    '100%': {
                      transform: 'translate(-50%, -50%) scale(0.95)',
                      opacity: 0.2,
                    },
                  },
                }}
              />
              <LockIcon
                sx={{
                  fontSize: 64,
                  color: 'error.main',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              />
            </Box>

            <Typography
              variant="h3"
              sx={{
                fontWeight: 'bold',
                color: 'error.main',
                mb: 2,
              }}
            >
              Accès non autorisé
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
              Désolé, vous n'avez pas les permissions nécessaires pour accéder à cette page.
              Si vous pensez qu'il s'agit d'une erreur, veuillez contacter l'administrateur.
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
              justifyContent: 'center',
              mb: 4,
            }}
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate(from === '/unauthorized' ? '/' : from)}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 2,
                bgcolor: 'primary.main',
                transition: 'all 0.2s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: (theme) => theme.shadows[4],
                },
              }}
            >
              Retour
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<HomeIcon />}
              onClick={() => navigate('/')}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 2,
                borderColor: 'primary.main',
                color: 'primary.main',
                '&:hover': {
                  borderColor: 'primary.main',
                  bgcolor: 'primary.light',
                },
              }}
            >
              Page d'accueil
            </Button>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              p: 2,
              borderRadius: 2,
              bgcolor: 'action.hover',
            }}
          >
            <HelpOutlineIcon color="action" />
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
                Contactez le support
              </Button>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Unauthorized;