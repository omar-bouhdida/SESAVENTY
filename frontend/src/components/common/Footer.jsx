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
  useMediaQuery,
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

const FooterLink = ({ text, path, url }) => {
  const content = (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 0.5,
        transition: 'all 0.2s',
        '&:hover': {
          transform: 'translateX(8px)',
          '& .arrow-icon': {
            opacity: 1,
          },
        },
      }}
    >
      <KeyboardArrowRightIcon 
        className="arrow-icon"
        sx={{ 
          fontSize: 16,
          color: 'primary.main',
          opacity: 0,
          transition: 'opacity 0.2s',
        }}
      />
      {text}
    </Box>
  );

  if (path) {
    return (
      <Link
        component={RouterLink}
        to={path}
        sx={{
          color: 'text.secondary',
          textDecoration: 'none',
          '&:hover': {
            color: 'primary.main',
          },
        }}
      >
        {content}
      </Link>
    );
  }

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        color: 'text.secondary',
        textDecoration: 'none',
        '&:hover': {
          color: 'primary.main',
        },
      }}
    >
      {content}
    </Link>
  );
};

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
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
          fontSize: { xs: '1rem', sm: '1.25rem' },
        }}
      >
        {title}
      </Typography>
      <Stack spacing={2}>
        {links.map((link) => (
          <FooterLink key={link.text} {...link} />
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
        pt: { xs: 4, md: 8 },
        pb: { xs: 3, md: 4 },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 4, md: 6 }}>
          <Grid item xs={12} md={4}>
            <Box mb={4}>
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  mb: 2, 
                  gap: 1,
                  justifyContent: { xs: 'center', md: 'flex-start' },
                }}
              >
                <Diamond sx={{ color: 'primary.main', fontSize: 32 }} />
                <Typography variant="h5" component="span" sx={{ fontWeight: 'bold' }}>
                  SESAVENTY
                </Typography>
              </Box>
              <Typography 
                variant="body1" 
                color="text.secondary"
                sx={{ 
                  mb: 3, 
                  lineHeight: 1.7,
                  textAlign: { xs: 'center', md: 'left' },
                }}
              >
                La plateforme de gestion des clubs étudiants de l'ENSIAS. 
                Découvrez, participez et créez des événements enrichissants.
              </Typography>
              <Stack 
                direction="row" 
                spacing={1}
                justifyContent={{ xs: 'center', md: 'flex-start' }}
              >
                {socialLinks.map((social) => (
                  <IconButton
                    key={social.name}
                    component="a"
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visitez notre page ${social.name}`}
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

        <Divider sx={{ my: { xs: 3, md: 4 } }} />

        <Box 
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: { xs: 2, sm: 0 },
          }}
        >
          <Typography 
            variant="body2" 
            color="text.secondary"
          >
            © {new Date().getFullYear()} SESAVENTY. Tous droits réservés.
          </Typography>
          <Box 
            component={Paper} 
            elevation={0} 
            sx={{ 
              bgcolor: 'action.hover', 
              borderRadius: 2, 
              px: 2, 
              py: 1,
              textAlign: 'center',
            }}
          >
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