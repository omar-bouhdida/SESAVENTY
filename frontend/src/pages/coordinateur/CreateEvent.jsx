import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Paper, Box } from '@mui/material';
import EventForm from '../../components/coordinateur/EventForm';
import { useEvent } from '../../hooks/useEvent';
import { useNotification } from '../../contexts/NotificationContext';

const CreateEvent = () => {
  const navigate = useNavigate();
  const { clubId } = useParams();
  const { createEvent } = useEvent();
  const { showNotification } = useNotification();

  const handleSubmit = async (eventData) => {
    try {
      await createEvent({ ...eventData, clubId });
      showNotification('Événement créé avec succès', 'success');
      navigate(`/clubs/${clubId}/events`);
    } catch (error) {
      showNotification(
        'Erreur lors de la création de l\'événement',
        'error'
      );
    }
  };

  return (
    <Container maxWidth="md">
      <Box py={4}>
        <Paper sx={{ p: 3 }}>
          <EventForm onSubmit={handleSubmit} />
        </Paper>
      </Box>
    </Container>
  );
};

export default CreateEvent;