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
} from '@mui/material';
import { useNotification } from '../../contexts/NotificationContext';
import { formatDateTime, formatUserName } from '../../utils/formatters';
import requestService from '../../services/requestService';

const MembershipRequestsList = ({ clubId }) => {
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
  }, [clubId]);

  const fetchRequests = async () => {
    try {
      const data = await requestService.getMembershipRequests(clubId);
      setRequests(data);
    } catch (error) {
      showNotification(
        'Erreur lors du chargement des demandes d\'adhésion',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (requestId) => {
    try {
      await requestService.approveMembershipRequest(clubId, requestId);
      showNotification('Demande d\'adhésion acceptée', 'success');
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
      await requestService.rejectMembershipRequest(
        clubId,
        rejectDialog.requestId,
        rejectDialog.reason
      );
      showNotification('Demande d\'adhésion refusée', 'success');
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
        Demandes d'adhésion
      </Typography>

      {requests.length === 0 ? (
        <Typography color="textSecondary">
          Aucune demande d'adhésion en attente
        </Typography>
      ) : (
        <List>
          {requests.map((request) => (
            <ListItem
              key={request.id}
              component={Paper}
              sx={{ mb: 2, p: 2, display: 'block' }}
            >
              <Box mb={2}>
                <Typography variant="subtitle1">
                  {formatUserName(request.utilisateur)}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Soumise le {formatDateTime(request.dateDemande)}
                </Typography>
              </Box>

              <Typography variant="body1" paragraph>
                {request.lettreMotivation}
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
                  Accepter
                </Button>
              </Box>
            </ListItem>
          ))}
        </List>
      )}

      <Dialog
        open={rejectDialog.open}
        onClose={() => setRejectDialog({ open: false, requestId: null, reason: '' })}
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

export default MembershipRequestsList;