import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  List,
} from '@mui/material';
import { useNotification } from '../../contexts/NotificationContext';
import RequestCard from '../../components/common/RequestCard';
import { getClubCreationRequests } from '../../services/requestService';

const ClubRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showNotification } = useNotification();

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const data = await getClubCreationRequests();
      setRequests(data);
    } catch (error) {
      showNotification(
        'Erreur lors du chargement des demandes',
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
        <Typography variant="h4" gutterBottom>
          Demandes de création de club
        </Typography>

        {requests.length === 0 ? (
          <Typography color="textSecondary">
            Aucune demande en attente
          </Typography>
        ) : (
          <List>
            {requests.map((request) => (
              <RequestCard
                key={request.id}
                request={request}
                onStatusChange={fetchRequests}
              />
            ))}
          </List>
        )}
      </Box>
    </Container>
  );
};

export default ClubRequests;