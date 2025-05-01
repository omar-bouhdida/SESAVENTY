import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  CircularProgress,
} from '@mui/material';
import {
  People as PeopleIcon,
  Event as EventIcon,
  Mail as MailIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';
import clubService from '../../services/clubService';
import requestService from '../../services/requestService';
import { formatUserName } from '../../utils/formatters';

const StatCard = ({ title, value, icon: Icon }) => (
  <Card>
    <CardContent>
      <Box display="flex" alignItems="center" mb={2}>
        <Icon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
        <Box>
          <Typography color="textSecondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h4">
            {value}
          </Typography>
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalMembers: 0,
    totalEvents: 0,
    pendingRequests: 0,
  });
  const [userClubs, setUserClubs] = useState([]);
  const { user } = useAuth();
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Charger les clubs dont l'utilisateur est coordinateur
      const clubs = await clubService.getCoordinatorClubs();
      setUserClubs(clubs);

      // Calculer les statistiques pour tous les clubs
      const statsData = {
        totalMembers: 0,
        totalEvents: 0,
        pendingRequests: 0,
      };

      for (const club of clubs) {
        const [members, events, requests] = await Promise.all([
          clubService.getClubMembers(club.id),
          clubService.getClubEvents(club.id),
          requestService.getMembershipRequests(club.id),
        ]);

        statsData.totalMembers += members.length;
        statsData.totalEvents += events.length;
        statsData.pendingRequests += requests.filter(r => r.statut === 'EN_ATTENTE').length;
      }

      setStats(statsData);
    } catch (error) {
      showNotification(
        'Erreur lors du chargement des données',
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
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h4">
            Tableau de bord
          </Typography>
        </Box>

        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} md={4}>
            <StatCard
              title="Membres totaux"
              value={stats.totalMembers}
              icon={PeopleIcon}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <StatCard
              title="Événements"
              value={stats.totalEvents}
              icon={EventIcon}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <StatCard
              title="Demandes en attente"
              value={stats.pendingRequests}
              icon={MailIcon}
            />
          </Grid>
        </Grid>

        <Typography variant="h5" gutterBottom>
          Vos clubs
        </Typography>

        <Grid container spacing={3}>
          {userClubs.map((club) => (
            <Grid item xs={12} md={6} key={club.id}>
              <Paper sx={{ p: 3 }}>
                <Box display="flex" alignItems="center" mb={2}>
                  {club.logo ? (
                    <img
                      src={club.logo}
                      alt={club.nom}
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 8,
                        marginRight: 16,
                      }}
                    />
                  ) : (
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: 2,
                        bgcolor: 'primary.main',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2,
                      }}
                    >
                      <Typography variant="h4" color="white">
                        {club.nom.charAt(0)}
                      </Typography>
                    </Box>
                  )}
                  <Box>
                    <Typography variant="h6">
                      {club.nom}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {club.domaine}
                    </Typography>
                  </Box>
                </Box>

                <Grid container spacing={2} mb={2}>
                  <Grid item xs={4}>
                    <Typography variant="subtitle2" color="textSecondary">
                      Membres
                    </Typography>
                    <Typography variant="h6">
                      {stats.totalMembers}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="subtitle2" color="textSecondary">
                      Événements
                    </Typography>
                    <Typography variant="h6">
                      {stats.totalEvents}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="subtitle2" color="textSecondary">
                      Demandes
                    </Typography>
                    <Typography variant="h6">
                      {stats.pendingRequests}
                    </Typography>
                  </Grid>
                </Grid>

                <Box display="flex" gap={2}>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => navigate(`/clubs/${club.id}/events/create`)}
                  >
                    Nouvel événement
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => navigate(`/clubs/${club.id}/members`)}
                  >
                    Gérer les membres
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard;