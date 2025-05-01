import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  CircularProgress,
  Button,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Add as AddIcon } from '@mui/icons-material';
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
    <Container maxWidth="lg">
      <Box py={4}>
        {/* Hero Section */}
        <Box
          sx={{
            textAlign: 'center',
            py: 6,
            mb: 4,
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            borderRadius: 2,
          }}
        >
          <Typography variant="h3" gutterBottom>
            Bienvenue sur SESAVENTY
          </Typography>
          <Typography variant="h6" sx={{ mb: 4 }}>
            Découvrez les clubs étudiants et participez à des événements passionnants
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            startIcon={<AddIcon />}
            onClick={handleCreateClub}
          >
            Créer un club
          </Button>
        </Box>

        {/* Clubs Section */}
        <Box mb={6}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Typography variant="h5">
              Clubs populaires
            </Typography>
            <Button onClick={() => navigate('/clubs')}>
              Voir tous les clubs
            </Button>
          </Box>
          <Grid container spacing={3}>
            {clubs.slice(0, 6).map((club) => (
              <Grid item xs={12} sm={6} md={4} key={club.id}>
                <ClubCard club={club} />
              </Grid>
            ))}
          </Grid>
        </Box>

        <Divider sx={{ my: 6 }} />

        {/* Events Section */}
        <Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Typography variant="h5">
              Événements à venir
            </Typography>
            <Button onClick={() => navigate('/events')}>
              Voir tous les événements
            </Button>
          </Box>
          <Grid container spacing={3}>
            {events.map((event) => (
              <Grid item xs={12} sm={6} md={4} key={event.id}>
                <EventCard event={event} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;