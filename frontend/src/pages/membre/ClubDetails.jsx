import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Avatar,
  Divider,
  Tab,
  Tabs,
  CircularProgress,
} from '@mui/material';
import { useClub } from '../../contexts/ClubContext';
import { useNotification } from '../../contexts/NotificationContext';
import { formatUserName } from '../../utils/formatters';
import EventsList from '../../components/membre/EventsList';
import MembersList from '../../components/coordinateur/MembersList';

const ClubDetails = () => {
  const { id } = useParams();
  const { getClubById } = useClub();
  const { showNotification } = useNotification();
  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    fetchClubDetails();
  }, [id]);

  const fetchClubDetails = async () => {
    try {
      const data = await getClubById(id);
      setClub(data);
    } catch (error) {
      showNotification(
        'Erreur lors du chargement des détails du club',
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

  if (!club) {
    return (
      <Container>
        <Typography variant="h5" align="center" color="error" my={4}>
          Club non trouvé
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Paper sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3}>
            <Avatar
              src={club.logo}
              alt={club.nom}
              sx={{ width: 150, height: 150 }}
              variant="rounded"
            />
          </Grid>
          <Grid item xs={12} sm={9}>
            <Typography variant="h4" gutterBottom>
              {club.nom}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              {club.domaine}
            </Typography>
            <Typography variant="body1" paragraph>
              {club.description}
            </Typography>
            <Typography variant="subtitle2">
              Coordinateur: {formatUserName(club.coordinateur)}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ mb: 4 }}>
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Objectifs" />
          <Tab label="Événements" />
          <Tab label="Membres" />
        </Tabs>
        <Box p={3}>
          {activeTab === 0 && (
            <Typography variant="body1">
              {club.objectifs}
            </Typography>
          )}
          {activeTab === 1 && (
            <EventsList clubId={id} />
          )}
          {activeTab === 2 && (
            <MembersList clubId={id} />
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default ClubDetails;