import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Box, Typography } from '@mui/material';
import ClubRegistrationForm from '../../components/etudiant/ClubRegistrationForm';
import { useNotification } from '../../contexts/NotificationContext';
import requestService from '../../services/requestService';

const CreateClubRequest = () => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const handleSubmit = async (formData) => {
    try {
      await requestService.createClubRequest(formData);
      showNotification('Demande de création de club envoyée avec succès', 'success');
      navigate('/student/clubs');
    } catch (error) {
      showNotification(
        'Erreur lors de l\'envoi de la demande',
        'error'
      );
    }
  };

  return (
    <Container maxWidth="md">
      <Box py={4}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom align="center">
            Créer un nouveau club
          </Typography>
          <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
            Remplissez le formulaire ci-dessous pour soumettre votre demande de création de club.
            Notre équipe examinera votre demande dans les plus brefs délais.
          </Typography>
          <ClubRegistrationForm onSubmit={handleSubmit} />
        </Paper>
      </Box>
    </Container>
  );
};

export default CreateClubRequest;