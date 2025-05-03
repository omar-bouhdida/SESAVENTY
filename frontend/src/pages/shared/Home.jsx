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
import { useAnimation } from '../../hooks/useAnimation';
import ClubCard from '../../components/common/ClubCard';
import EventCard from '../../components/common/EventCard';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';
import clubService from '../../services/clubService';
import eventService from '../../services/eventService';

const StatBox = ({ number, label, delay = 0 }) => {
  const animationRef = useAnimation('scale-up', delay);

  return (
    <Box sx={{ textAlign: 'center' }} ref={animationRef}>
      <Typography 
        variant="h3" 
        color="primary" 
        sx={{ 
          fontWeight: 'bold',
          mb: 1,
          background: (theme) => `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {number}
      </Typography>
      <Typography 
        variant="subtitle1" 
        color="text.secondary"
        sx={{ fontWeight: 500 }}
      >
        {label}
      </Typography>
    </Box>
  );
};

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [clubs, setClubs] = useState([]);
  const [events, setEvents] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const theme = useTheme();

  const heroTitleRef = useAnimation('slide-right');
  const heroSubtitleRef = useAnimation('slide-right', 0.2);
  const heroButtonsRef = useAnimation('fade-in', 0.4);
  const heroImageRef = useAnimation('slide-up', 0.3);

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
      showNotification('Erreur lors du chargement des données', 'error');
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
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress size={40} />
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
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
            backgroundImage: 'url(/pattern.svg)',
            backgroundSize: 'cover',
            opacity: 0.1,
          }
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box ref={heroTitleRef}>
                <Typography 
                  variant="h1" 
                  sx={{ 
                    fontWeight: 'bold',
                    mb: 2,
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    letterSpacing: '-0.02em',
                  }}
                >
                  SESAVENTY
                </Typography>
              </Box>
              
              <Box ref={heroSubtitleRef}>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    mb: 4,
                    fontWeight: 'light',
                    lineHeight: 1.5,
                    opacity: 0.9,
                  }}
                >
                  Découvrez et rejoignez les clubs étudiants de l'Université Sesame. 
                  Participez à des événements enrichissants et développez vos compétences.
                </Typography>
              </Box>

              <Box ref={heroButtonsRef} sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
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
                    borderRadius: 2,
                    boxShadow: theme.shadows[4],
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: theme.shadows[8],
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
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    borderRadius: 2,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      borderColor: 'primary.contrastText',
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                      transform: 'translateX(4px)',
                    }
                  }}
                >
                  Explorer
                </Button>
              </Box>
            </Grid>

            <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box
                ref={heroImageRef}
                component="img"
                src="/images/hero-illustration.svg"
                alt="Club activities illustration"
                sx={{
                  width: '100%',
                  maxWidth: 500,
                  height: 'auto',
                  filter: 'drop-shadow(0 0 20px rgba(0,0,0,0.1))',
                }}
                className="animate-float"
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
            p: 4,
            mb: 8,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 4,
            justifyContent: 'space-around',
            bgcolor: 'background.paper',
            borderRadius: 3,
            boxShadow: theme.shadows[3],
            transition: 'transform 0.3s ease-in-out',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: theme.shadows[6],
            }
          }}
        >
          <StatBox number={clubs.length} label="Clubs Actifs" delay={0} />
          <StatBox number={events.length} label="Événements" delay={0.2} />
          <StatBox 
            number={clubs.reduce((acc, club) => acc + (club.nombreMembres || 0), 0)} 
            label="Membres" 
            delay={0.4}
          />
        </Paper>

        {/* Clubs Section */}
        <Box mb={8}>
          <SectionHeader 
            icon={<GroupsIcon sx={{ fontSize: 32 }} />}
            title="Clubs populaires"
            buttonText="Voir tous les clubs"
            onButtonClick={() => navigate('/clubs')}
          />
          
          <Grid container spacing={3}>
            {clubs.slice(0, 6).map((club, index) => (
              <Grid item xs={12} sm={6} md={4} key={club.id}>
                <Box sx={{ opacity: 0 }} ref={useAnimation('slide-up', index * 0.1)}>
                  <ClubCard club={club} />
                </Box>
              </Grid>
            ))}
            {clubs.length === 0 && <EmptyState text="Aucun club disponible pour le moment" />}
          </Grid>
        </Box>

        <Divider sx={{ my: 8 }} />

        {/* Events Section */}
        <Box mb={8}>
          <SectionHeader 
            icon={<EventIcon sx={{ fontSize: 32 }} />}
            title="Événements à venir"
            buttonText="Voir tous les événements"
            onButtonClick={() => navigate('/events')}
          />

          <Grid container spacing={3}>
            {events.map((event, index) => (
              <Grid item xs={12} sm={6} md={4} key={event.id}>
                <Box sx={{ opacity: 0 }} ref={useAnimation('slide-up', index * 0.1)}>
                  <EventCard event={event} />
                </Box>
              </Grid>
            ))}
            {events.length === 0 && <EmptyState text="Aucun événement prévu pour le moment" />}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

const SectionHeader = ({ icon, title, buttonText, onButtonClick }) => {
  const headerRef = useAnimation('slide-right');
  
  return (
    <Box
      ref={headerRef}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={4}
    >
      <Box display="flex" alignItems="center" gap={2}>
        {React.cloneElement(icon, { color: "primary" })}
        <Typography variant="h4" fontWeight="bold">
          {title}
        </Typography>
      </Box>
      <Button 
        onClick={onButtonClick}
        endIcon={<ArrowForwardIcon />}
        sx={{
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateX(4px)',
          }
        }}
      >
        {buttonText}
      </Button>
    </Box>
  );
};

const EmptyState = ({ text }) => (
  <Box 
    sx={{ 
      width: '100%', 
      textAlign: 'center', 
      py: 8,
      color: 'text.secondary'
    }}
  >
    <Typography variant="h6">
      {text}
    </Typography>
  </Box>
);

export default Home;