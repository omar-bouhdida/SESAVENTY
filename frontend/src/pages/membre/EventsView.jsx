import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Box,
  Typography,
  Grid,
  CircularProgress,
  Tabs,
  Tab,
} from '@mui/material';
import EventsList from '../../components/membre/EventsList';
import { useNotification } from '../../contexts/NotificationContext';
import { useAuth } from '../../contexts/AuthContext';
import eventService from '../../services/eventService';
import memberService from '../../services/memberService';

const EventsView = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [clubs, setClubs] = useState([]);
  const { user } = useAuth();
  const { showNotification } = useNotification();

  useEffect(() => {
    fetchUserClubs();
  }, []);

  const fetchUserClubs = async () => {
    try {
      const membershipData = await memberService.getUserMemberships();
      setClubs(membershipData.map(membership => membership.club));
    } catch (error) {
      showNotification(
        'Erreur lors du chargement des clubs',
        'error'
      );
    } finally {
      setLoading(false);
    }
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
        <Typography variant="h5" gutterBottom>
          Événements
        </Typography>

        <Paper sx={{ mb: 4 }}>
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Tous les événements publics" />
            <Tab label="Événements de mes clubs" />
          </Tabs>

          <Box p={3}>
            {activeTab === 0 && (
              <EventsList filter="public" />
            )}
            {activeTab === 1 && clubs.length === 0 ? (
              <Typography color="text.secondary" align="center">
                Vous n'êtes membre d'aucun club pour le moment.
                Rejoignez des clubs pour voir leurs événements.
              </Typography>
            ) : (
              <Grid container spacing={3}>
                {clubs.map((club) => (
                  <Grid item xs={12} key={club.id}>
                    <Typography variant="h6" gutterBottom>
                      {club.nom}
                    </Typography>
                    <EventsList clubId={club.id} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default EventsView;