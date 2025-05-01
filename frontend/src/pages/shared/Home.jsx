import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  CircularProgress,
  Button,
  Divider,
  Paper,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { 
  Add as AddIcon,
  Groups as GroupsIcon,
  Event as EventIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import ClubCard from '../../components/common/ClubCard';
import EventCard from '../../components/common/EventCard';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';
import clubService from '../../services/clubService';
import eventService from '../../services/eventService';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [clubs, setClubs] = useState([]);
  const [events, setEvents] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [clubsData, eventsData] = await Promise.all([
        clubService.getActiveClubs(),
        eventService.getPublicEvents({ limit: 6 }),
      ]);
      setClubs(clubsData);
      setEvents(eventsData);
    } catch (error) {
      showNotification(
        'Erreur lors du chargement des données',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCreateClub = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate('/student/create-club');
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" my={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: (theme) => `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
          color: 'primary.contrastText',
          pt: { xs: 8, md: 12 },
          pb: { xs: 10, md: 14 },
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url(/images/pattern.svg)',
            backgroundSize: 'cover',
            opacity: 0.1,
          }
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography 
                variant="h2" 
                component="h1" 
                sx={{ 
                  fontWeight: 'bold',
                  mb: 2,
                  fontSize: { xs: '2.5rem', md: '3.5rem' }
                }}
              >
                SESAVENTY
              </Typography>
              <Typography 
                variant="h5" 
                sx={{ 
                  mb: 4,
                  fontWeight: 'light',
                  lineHeight: 1.5
                }}
              >
                Découvrez et rejoignez les clubs étudiants de l'ENSIAS. 
                Participez à des événements enrichissants et développez vos compétences.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  color="secondary"
                  startIcon={<AddIcon />}
                  onClick={handleCreateClub}
                  sx={{
                    py: 1.5,
                    px: 4,
                    fontSize: '1.1rem',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: (theme) => theme.shadows[8],
                    }
                  }}
                >
                  Créer un club
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  color="inherit"
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => navigate('/clubs')}
                  sx={{
                    py: 1.5,
                    px: 4,
                    fontSize: '1.1rem',
                    borderColor: 'primary.contrastText',
                    '&:hover': {
                      borderColor: 'primary.contrastText',
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                    }
                  }}
                >
                  Explorer
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box
                component="img"
                src="/images/hero-illustration.svg"
                alt="Club activities illustration"
                sx={{
                  width: '100%',
                  maxWidth: 500,
                  height: 'auto',
                  animation: 'float 6s ease-in-out infinite',
                  '@keyframes float': {
                    '0%, 100%': {
                      transform: 'translateY(0)',
                    },
                    '50%': {
                      transform: 'translateY(-20px)',
                    },
                  },
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mt: -6, position: 'relative', zIndex: 1 }}>
        {/* Stats Section */}
        <Paper
          elevation={3}
          sx={{
            p: 3,
            mb: 6,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 4,
            justifyContent: 'space-around',
            bgcolor: 'background.paper',
            borderRadius: 2,
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" color="primary" fontWeight="bold">
              {clubs.length}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Clubs Actifs
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" color="primary" fontWeight="bold">
              {events.length}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Événements
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" color="primary" fontWeight="bold">
              {clubs.reduce((acc, club) => acc + (club.nombreMembres || 0), 0)}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Membres
            </Typography>
          </Box>
        </Paper>

        {/* Clubs Section */}
        <Box mb={8}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={4}
          >
            <Box display="flex" alignItems="center" gap={2}>
              <GroupsIcon color="primary" sx={{ fontSize: 32 }} />
              <Typography variant="h4" fontWeight="bold">
                Clubs populaires
              </Typography>
            </Box>
            <Button 
              onClick={() => navigate('/clubs')}
              endIcon={<ArrowForwardIcon />}
              sx={{
                '&:hover': {
                  transform: 'translateX(4px)',
                  transition: 'transform 0.2s',
                }
              }}
            >
              Voir tous les clubs
            </Button>
          </Box>
          <Grid container spacing={3}>
            {clubs.slice(0, 6).map((club) => (
              <Grid item xs={12} sm={6} md={4} key={club.id}>
                <ClubCard club={club} />
              </Grid>
            ))}
            {clubs.length === 0 && (
              <Box 
                sx={{ 
                  width: '100%', 
                  textAlign: 'center', 
                  py: 8,
                  color: 'text.secondary'
                }}
              >
                <Typography variant="h6">
                  Aucun club disponible pour le moment
                </Typography>
              </Box>
            )}
          </Grid>
        </Box>

        <Divider sx={{ my: 8 }} />

        {/* Events Section */}
        <Box mb={8}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={4}
          >
            <Box display="flex" alignItems="center" gap={2}>
              <EventIcon color="primary" sx={{ fontSize: 32 }} />
              <Typography variant="h4" fontWeight="bold">
                Événements à venir
              </Typography>
            </Box>
            <Button 
              onClick={() => navigate('/events')}
              endIcon={<ArrowForwardIcon />}
              sx={{
                '&:hover': {
                  transform: 'translateX(4px)',
                  transition: 'transform 0.2s',
                }
              }}
            >
              Voir tous les événements
            </Button>
          </Box>
          <Grid container spacing={3}>
            {events.map((event) => (
              <Grid item xs={12} sm={6} md={4} key={event.id}>
                <EventCard event={event} />
              </Grid>
            ))}
            {events.length === 0 && (
              <Box 
                sx={{ 
                  width: '100%', 
                  textAlign: 'center', 
                  py: 8,
                  color: 'text.secondary'
                }}
              >
                <Typography variant="h6">
                  Aucun événement prévu pour le moment
                </Typography>
              </Box>
            )}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;