import React from 'react';
import {
  Box,
  Container,
  Typography,
  Link,
  Grid,
  Divider,
  IconButton,
  Paper,
  Stack,
  useTheme,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  Instagram as InstagramIcon,
  KeyboardArrowRight as KeyboardArrowRightIcon,
  Diamond,
} from '@mui/icons-material';

const Footer = () => {
  const theme = useTheme();
  
  const socialLinks = [
    { icon: <FacebookIcon />, url: 'https://facebook.com', name: 'Facebook' },
    { icon: <TwitterIcon />, url: 'https://twitter.com', name: 'Twitter' },
    { icon: <LinkedInIcon />, url: 'https://linkedin.com', name: 'LinkedIn' },
    { icon: <InstagramIcon />, url: 'https://instagram.com', name: 'Instagram' },
  ];

  const footerLinks = {
    'Navigation': [
      { text: 'Accueil', path: '/' },
      { text: 'Clubs', path: '/clubs' },
      { text: 'Événements', path: '/events' },
      { text: 'Contact', path: '/contact' },
    ],
    'Ressources': [
      { text: 'ENSIAS', url: 'http://www.ensias.ma' },
      { text: 'Guide d\'utilisation', url: '#' },
      { text: 'FAQ', url: '#' },
      { text: 'Blog', url: '#' },
    ],
    'Légal': [
      { text: 'Confidentialité', url: '#' },
      { text: 'Conditions d\'utilisation', url: '#' },
      { text: 'Mentions légales', url: '#' },
    ],
  };

  const renderFooterLinks = (title, links) => (
    <Box>
      <Typography 
        variant="h6" 
        sx={{ 
          color: 'text.primary',
          fontWeight: 'bold',
          mb: 3,
        }}
      >
        {title}
      </Typography>
      <Stack spacing={2}>
        {links.map((link) => (
          <Box
            key={link.text}
            sx={{
              display: 'flex',
              alignItems: 'center',
              transition: 'all 0.2s',
              '&:hover': {
                transform: 'translateX(8px)',
              },
            }}
          >
            <KeyboardArrowRightIcon 
              sx={{ 
                fontSize: 16,
                color: 'primary.main',
                opacity: 0,
                transition: 'opacity 0.2s',
                mr: -1,
              }}
            />
            {link.path ? (
              <Link
                component={RouterLink}
                to={link.path}
                sx={{
                  color: 'text.secondary',
                  textDecoration: 'none',
                  '&:hover': {
                    color: 'primary.main',
                    '& + svg': {
                      opacity: 1,
                    },
                  },
                }}
              >
                {link.text}
              </Link>
            ) : (
              <Link
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: 'text.secondary',
                  textDecoration: 'none',
                  '&:hover': {
                    color: 'primary.main',
                    '& + svg': {
                      opacity: 1,
                    },
                  },
                }}
              >
                {link.text}
              </Link>
            )}
          </Box>
        ))}
      </Stack>
    </Box>
  );

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        borderTop: 1,
        borderColor: 'divider',
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Box py={8}>
          <Grid container spacing={6}>
            <Grid item xs={12} md={4}>
              <Box mb={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
                  <Diamond sx={{ color: 'primary.main', fontSize: 32 }} />
                  <Typography variant="h5" component="span" sx={{ fontWeight: 'bold' }}>
                    SESAVENTY
                  </Typography>
                </Box>
                <Typography 
                  variant="body1" 
                  color="text.secondary"
                  sx={{ mb: 3, lineHeight: 1.7 }}
                >
                  La plateforme de gestion des clubs étudiants de l'ENSIAS. 
                  Découvrez, participez et créez des événements enrichissants.
                </Typography>
                <Stack direction="row" spacing={1}>
                  {socialLinks.map((social) => (
                    <IconButton
                      key={social.name}
                      component="a"
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        color: 'text.secondary',
                        transition: 'all 0.2s',
                        '&:hover': {
                          color: 'primary.main',
                          transform: 'translateY(-4px)',
                        },
                      }}
                    >
                      {social.icon}
                    </IconButton>
                  ))}
                </Stack>
              </Box>
            </Grid>

            <Grid item xs={12} md={8}>
              <Grid container spacing={4}>
                {Object.entries(footerLinks).map(([title, links]) => (
                  <Grid item xs={12} sm={4} key={title}>
                    {renderFooterLinks(title, links)}
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Box>

        <Divider />

        <Box 
          py={3} 
          display="flex" 
          flexWrap="wrap"
          justifyContent="space-between" 
          alignItems="center"
        >
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ mb: { xs: 2, sm: 0 } }}
          >
            © {new Date().getFullYear()} SESAVENTY. Tous droits réservés.
          </Typography>
          <Box component={Paper} elevation={0} sx={{ bgcolor: 'action.hover', borderRadius: 2, px: 2, py: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Made with ♥ by ENSIAS Students
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;