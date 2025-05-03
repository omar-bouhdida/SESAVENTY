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
import logo from '../../assets/logo.png';
import { Link as RouterLink } from 'react-router-dom';
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ChevronRight,
  Diamond,
} from 'lucide-react';

const FooterLink = ({ text, path, url }) => {
  return (
    <Link
      component={path ? RouterLink : 'a'}
      to={path}
      href={url}
      target={url ? '_blank' : undefined}
      rel={url ? 'noopener noreferrer' : undefined}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        color: 'text.secondary',
        textDecoration: 'none',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          color: '#6347FF',
          transform: 'translateX(8px)',
          '& .arrow-icon': {
            opacity: 1,
            transform: 'translateX(4px)',
          },
        },
      }}
    >
      <ChevronRight 
        className="arrow-icon"
        size={16}
        style={{ 
          color: '#6347FF',
          opacity: 0,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: 'translateX(-4px)',
        }}
      />
      <Typography variant="body1">{text}</Typography>
    </Link>
  );
};

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const socialLinks = [
    { icon: <Facebook size={20} />, url: 'https://www.facebook.com/profile.php?id=61575874712141', name: 'Facebook' },
    { icon: <Instagram size={20} />, url: 'https://www.instagram.com/sesaventy/', name: 'Instagram' },
  ];

  const footerLinks = {
    'Navigation': [
      { text: 'Accueil', path: '/' },
      { text: 'Clubs', path: '/clubs' },
      { text: 'Événements', path: '/events' },
      { text: 'Contact', path: '/contact' },
    ],
    'Ressources': [
      { text: 'Université Sesame', url: 'https://universitesesame.com/' },
      { text: 'FAQ', path: '/faq' },
      { text: 'Blog', url: '#' },
    ],
    'Légal': [
      { text: 'Confidentialité', path: '/privacy-policy' },
      { text: 'Conditions d\'utilisation', path: '/terms-of-service' },
      { text: 'Mentions légales', path: '/legal-notice' },
    ],
  };

  const renderFooterLinks = (title, links) => (
    <Box sx={{ 
      transition: 'transform 0.3s',
      '&:hover': {
        transform: 'translateY(-4px)',
      }
    }}>
      <Typography 
        variant="h6" 
        sx={{ 
          color: 'text.primary',
          fontWeight: 'bold',
          mb: 3,
          fontSize: '1.1rem',
          position: 'relative',
          display: 'inline-block',
          '&:after': {
            content: '""',
            position: 'absolute',
            bottom: -8,
            left: 0,
            width: '40px',
            height: '3px',
            backgroundColor: '#6347FF',
            transition: 'width 0.3s',
          },
          '&:hover:after': {
            width: '60px',
          }
        }}
      >
        {title}
      </Typography>
      <Stack spacing={2.5}>
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
        bgcolor: '#f9f9ff',
        borderTop: '1px solid',
        borderColor: 'divider',
        mt: 'auto',
        pt: { xs: 6, md: 8 },
        pb: { xs: 4, md: 6 },
        transition: 'all 0.3s',
        '&:hover': {
          bgcolor: '#f5f4ff',
        }
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 5, md: 8 }}>
          <Grid item xs={12} md={4}>
            <Box sx={{ 
              mb: 4,
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'translateY(-4px)',
              }
            }}>
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  mb: 2.5,
                  gap: 1.5,
                  justifyContent: { xs: 'center', md: 'flex-start' },
                }}
              >
                <img src={logo} alt="Logo" style={{ height: 36, width: 36 }} />
                <Typography variant="h5" component="span" sx={{ 
                  fontWeight: 'bold',
                  color: '#6347FF',
                  letterSpacing: '0.5px',
                }}>
                  SESAVENTY
                </Typography>
              </Box>
              <Typography 
                variant="body1" 
                color="text.secondary"
                sx={{ 
                  mb: 3, 
                  lineHeight: 1.8,
                  textAlign: { xs: 'center', md: 'left' },
                  fontSize: '0.95rem',
                }}
              >
                La plateforme de gestion des clubs étudiants de l'Université Sesame. 
                Découvrez, participez et créez des événements enrichissants.
              </Typography>
              <Stack 
                direction="row" 
                spacing={1.5}
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
                      bgcolor: 'background.paper',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        color: 'white',
                        bgcolor: '#6347FF',
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
            <Grid container spacing={{ xs: 4, md: 6 }}>
              {Object.entries(footerLinks).map(([title, links]) => (
                <Grid item xs={12} sm={4} key={title}>
                  {renderFooterLinks(title, links)}
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>

        <Divider sx={{ 
          my: { xs: 4, md: 6 },
          borderColor: 'divider',
          opacity: 0.5,
        }} />

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
            sx={{
              transition: 'color 0.3s',
              '&:hover': {
                color: '#6347FF',
              }
            }}
          >
            © {new Date().getFullYear()} SESAVENTY. Tous droits réservés.
          </Typography>
          <Box 
            component={Paper} 
            elevation={0} 
            sx={{ 
              bgcolor: 'rgba(99, 71, 255, 0.1)', 
              borderRadius: 3, 
              px: 3, 
              py: 1.2,
              textAlign: 'center',
              transition: 'all 0.3s',
              '&:hover': {
                bgcolor: 'rgba(99, 71, 255, 0.2)',
                transform: 'translateY(-2px)',
              }
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Fait avec ♥ par les étudiants de l'Université Sesame
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;