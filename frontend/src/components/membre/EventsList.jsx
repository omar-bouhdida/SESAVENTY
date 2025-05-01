import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
  Chip,
} from '@mui/material';
import {
  Event as EventIcon,
  LocationOn,
  Public,
  Lock,
} from '@mui/icons-material';
import { useNotification } from '../../contexts/NotificationContext';
import { formatDateTime } from '../../utils/formatters';
import eventService from '../../services/eventService';

const EventsList = ({ clubId }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showNotification } = useNotification();

  useEffect(() => {
    fetchEvents();
  }, [clubId]);

  const fetchEvents = async () => {
    try {
      const data = await eventService.getClubEvents(clubId);
      setEvents(data);
    } catch (error) {
      showNotification(
        'Erreur lors du chargement des événements',
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
    <Box>
      <Typography variant="h6" gutterBottom>
        Événements du club
      </Typography>

      {events.length === 0 ? (
        <Typography color="textSecondary">
          Aucun événement programmé
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {events.map((event) => (
            <Grid item xs={12} md={6} key={event.id}>
              <Card>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6" component="h2">
                      {event.titre}
                    </Typography>
                    <Chip
                      icon={event.estPublic ? <Public /> : <Lock />}
                      label={event.estPublic ? 'Public' : 'Privé'}
                      size="small"
                      color={event.estPublic ? 'success' : 'default'}
                    />
                  </Box>

                  <Typography variant="body2" color="text.secondary" paragraph>
                    {event.description}
                  </Typography>

                  <Box display="flex" alignItems="center" mb={1}>
                    <EventIcon sx={{ mr: 1, fontSize: 20 }} />
                    <Typography variant="body2">
                      {formatDateTime(event.dateHeure)}
                    </Typography>
                  </Box>

                  <Box display="flex" alignItems="center">
                    <LocationOn sx={{ mr: 1, fontSize: 20 }} />
                    <Typography variant="body2">
                      {event.lieu}
                    </Typography>
                  </Box>
                </CardContent>

                <CardActions>
                  <Button size="small" color="primary">
                    Voir les détails
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default EventsList;