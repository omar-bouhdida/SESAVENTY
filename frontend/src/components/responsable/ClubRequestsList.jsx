import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Avatar,
  Grid,
} from '@mui/material';
import { useNotification } from '../../contexts/NotificationContext';
import { formatDateTime, formatUserName } from '../../utils/formatters';
import requestService from '../../services/requestService';

const ClubRequestsList = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rejectDialog, setRejectDialog] = useState({
    open: false,
    requestId: null,
    reason: '',
  });
  const { showNotification } = useNotification();

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const data = await requestService.getClubCreationRequests();
      setRequests(data);
    } catch (error) {
      showNotification(
        'Erreur lors du chargement des demandes de création de club',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (requestId) => {
    try {
      await requestService.approveClubRequest(requestId);
      showNotification('Demande de création de club acceptée', 'success');
      fetchRequests();
    } catch (error) {
      showNotification(
        'Erreur lors de l\'approbation de la demande',
        'error'
      );
    }
  };

  const handleReject = async () => {
    try {
      await requestService.rejectClubRequest(
        rejectDialog.requestId,
        rejectDialog.reason
      );
      showNotification('Demande de création de club refusée', 'success');
      setRejectDialog({ open: false, requestId: null, reason: '' });
      fetchRequests();
    } catch (error) {
      showNotification(
        'Erreur lors du refus de la demande',
        'error'
      );
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
        Demandes de création de club
      </Typography>

      {requests.length === 0 ? (
        <Typography color="textSecondary">
          Aucune demande de création de club en attente
        </Typography>
      ) : (
        <List>
          {requests.map((request) => (
            <ListItem
              key={request.id}
              component={Paper}
              sx={{ mb: 2, p: 2, display: 'block' }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={2}>
                  <Avatar
                    src={request.logo}
                    alt={request.nomClub}
                    sx={{ width: 100, height: 100 }}
                    variant="rounded"
                  />
                </Grid>
                <Grid item xs={12} sm={10}>
                  <Box mb={2}>
                    <Typography variant="h6">
                      {request.nomClub}
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                      Type d'activité: {request.typeActivite}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Créé par {formatUserName(request.createur)} le {formatDateTime(request.dateDemande)}
                    </Typography>
                  </Box>

                  <Typography variant="subtitle1" gutterBottom>
                    Objectifs:
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {request.objectifs}
                  </Typography>

                  <Box display="flex" justifyContent="flex-end" gap={1}>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() =>
                        setRejectDialog({
                          open: true,
                          requestId: request.id,
                          reason: '',
                        })
                      }
                    >
                      Refuser
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleApprove(request.id)}
                    >
                      Approuver
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
      )}

      <Dialog
        open={rejectDialog.open}
        onClose={() => setRejectDialog({ open: false, requestId: null, reason: '' })}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Motif du refus</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Motif"
            fullWidth
            multiline
            rows={4}
            value={rejectDialog.reason}
            onChange={(e) =>
              setRejectDialog({ ...rejectDialog, reason: e.target.value })
            }
            placeholder="Veuillez expliquer la raison du refus..."
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() =>
              setRejectDialog({ open: false, requestId: null, reason: '' })
            }
          >
            Annuler
          </Button>
          <Button
            onClick={handleReject}
            color="error"
            disabled={!rejectDialog.reason.trim()}
          >
            Refuser la demande
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ClubRequestsList;