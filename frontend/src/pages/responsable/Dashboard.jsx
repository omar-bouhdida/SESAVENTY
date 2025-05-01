import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
} from '@mui/material';
import {
  Groups as GroupsIcon,
  AccountCircle as AccountCircleIcon,
  Event as EventIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../contexts/NotificationContext';
import clubService from '../../services/clubService';
import { getClubCreationRequests } from '../../services/requestService';
import { formatDateTime, formatUserName } from '../../utils/formatters';

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
    totalClubs: 0,
    totalMembers: 0,
    totalEvents: 0,
  });
  const [recentRequests, setRecentRequests] = useState([]);
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [clubs, requests] = await Promise.all([
        clubService.getClubs(),
        getClubCreationRequests(),
      ]);

      // Calculer les statistiques globales
      let totalMembers = 0;
      let totalEvents = 0;

      for (const club of clubs) {
        const [members, events] = await Promise.all([
          clubService.getClubMembers(club.id),
          clubService.getClubEvents(club.id),
        ]);
        totalMembers += members.length;
        totalEvents += events.length;
      }

      setStats({
        totalClubs: clubs.length,
        totalMembers,
        totalEvents,
      });

      // Récupérer les demandes récentes en attente
      const pendingRequests = requests
        .filter(request => request.statut === 'EN_ATTENTE')
        .sort((a, b) => new Date(b.dateDemande) - new Date(a.dateDemande))
        .slice(0, 5);

      setRecentRequests(pendingRequests);
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
              title="Clubs actifs"
              value={stats.totalClubs}
              icon={GroupsIcon}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <StatCard
              title="Membres totaux"
              value={stats.totalMembers}
              icon={AccountCircleIcon}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <StatCard
              title="Événements"
              value={stats.totalEvents}
              icon={EventIcon}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">
                  Demandes de création de club récentes
                </Typography>
                <Button
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => navigate('/responsable/club-requests')}
                >
                  Voir toutes les demandes
                </Button>
              </Box>

              {recentRequests.length === 0 ? (
                <Typography color="textSecondary">
                  Aucune demande en attente
                </Typography>
              ) : (
                <List>
                  {recentRequests.map((request) => (
                    <ListItem
                      key={request.id}
                      sx={{
                        bgcolor: 'background.paper',
                        mb: 1,
                        borderRadius: 1,
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          src={request.logo}
                          alt={request.nomClub}
                          variant="rounded"
                        >
                          {request.nomClub.charAt(0)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={request.nomClub}
                        secondary={`Demande de ${formatUserName(request.createur)} - ${formatDateTime(request.dateDemande)}`}
                      />
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => navigate(`/responsable/club-requests/${request.id}`)}
                      >
                        Examiner
                      </Button>
                    </ListItem>
                  ))}
                </List>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard;