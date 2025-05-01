import React from 'react';
import {
  Box,
  Container,
  Typography,
  Link,
  Grid,
  Divider,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              SESAVENTY
            </Typography>
            <Typography variant="body2" color="text.secondary">
              La plateforme de gestion des clubs étudiants de l'ENSIAS
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Liens utiles
            </Typography>
            <Box display="flex" flexDirection="column">
              <Link
                component={RouterLink}
                to="/clubs"
                color="text.secondary"
                sx={{ mb: 1 }}
              >
                Clubs
              </Link>
              <Link
                component={RouterLink}
                to="/events"
                color="text.secondary"
                sx={{ mb: 1 }}
              >
                Événements
              </Link>
              <Link
                component={RouterLink}
                to="/contact"
                color="text.secondary"
              >
                Contact
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Ressources
            </Typography>
            <Box display="flex" flexDirection="column">
              <Link
                href="http://www.ensias.ma"
                target="_blank"
                rel="noopener noreferrer"
                color="text.secondary"
                sx={{ mb: 1 }}
              >
                ENSIAS
              </Link>
              <Link
                href="#"
                color="text.secondary"
                sx={{ mb: 1 }}
              >
                Guide d'utilisation
              </Link>
              <Link
                href="#"
                color="text.secondary"
              >
                FAQ
              </Link>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} SESAVENTY. Tous droits réservés.
          </Typography>
          <Box>
            <Link
              href="#"
              color="text.secondary"
              sx={{ mr: 2 }}
            >
              Confidentialité
            </Link>
            <Link
              href="#"
              color="text.secondary"
            >
              Conditions d'utilisation
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;