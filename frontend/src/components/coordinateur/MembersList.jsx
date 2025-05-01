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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useNotification } from '../../contexts/NotificationContext';
import {
  formatUserName,
  formatMemberRole,
  formatMemberStatus,
  getInitials,
} from '../../utils/formatters';
import { MEMBRE_ROLES, MEMBRE_STATUS } from '../../utils/constants';
import memberService from '../../services/memberService';

const MembersList = ({ clubId }) => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialog, setDialog] = useState({
    open: false,
    type: null, // 'role' or 'status'
    memberId: null,
    value: '',
  });
  const { showNotification } = useNotification();

  useEffect(() => {
    fetchMembers();
  }, [clubId]);

  const fetchMembers = async () => {
    try {
      const data = await memberService.getClubMembers(clubId);
      setMembers(data);
    } catch (error) {
      showNotification('Erreur lors du chargement des membres', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRole = async () => {
    try {
      await memberService.updateMemberRole(clubId, dialog.memberId, dialog.value);
      showNotification('Rôle du membre mis à jour', 'success');
      fetchMembers();
      handleCloseDialog();
    } catch (error) {
      showNotification('Erreur lors de la mise à jour du rôle', 'error');
    }
  };

  const handleUpdateStatus = async () => {
    try {
      await memberService.updateMemberStatus(clubId, dialog.memberId, dialog.value);
      showNotification('Statut du membre mis à jour', 'success');
      fetchMembers();
      handleCloseDialog();
    } catch (error) {
      showNotification('Erreur lors de la mise à jour du statut', 'error');
    }
  };

  const handleRemoveMember = async (memberId) => {
    try {
      await memberService.removeMember(clubId, memberId);
      showNotification('Membre retiré du club', 'success');
      fetchMembers();
    } catch (error) {
      showNotification('Erreur lors de la suppression du membre', 'error');
    }
  };

  const handleOpenDialog = (type, memberId, currentValue) => {
    setDialog({
      open: true,
      type,
      memberId,
      value: currentValue,
    });
  };

  const handleCloseDialog = () => {
    setDialog({
      open: false,
      type: null,
      memberId: null,
      value: '',
    });
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
        Membres du club
      </Typography>

      {members.length === 0 ? (
        <Typography color="textSecondary">
          Aucun membre dans le club
        </Typography>
      ) : (
        <List>
          {members.map((member) => (
            <ListItem
              key={member.id}
              component={Paper}
              sx={{ mb: 2, p: 2, display: 'block' }}
            >
              <Box display="flex" alignItems="center" mb={2}>
                <Avatar
                  src={member.utilisateur.photo}
                  alt={formatUserName(member.utilisateur)}
                  sx={{ width: 50, height: 50, mr: 2 }}
                >
                  {getInitials(member.utilisateur)}
                </Avatar>
                <Box flexGrow={1}>
                  <Typography variant="subtitle1">
                    {formatUserName(member.utilisateur)}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {member.utilisateur.email}
                  </Typography>
                </Box>
              </Box>

              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="body2">
                    Rôle: {formatMemberRole(member.role)}
                  </Typography>
                  <Typography variant="body2">
                    Statut: {formatMemberStatus(member.statut)}
                  </Typography>
                </Box>

                <Box display="flex" gap={1}>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleOpenDialog('role', member.id, member.role)}
                  >
                    Changer le rôle
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleOpenDialog('status', member.id, member.statut)}
                  >
                    Changer le statut
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleRemoveMember(member.id)}
                  >
                    Retirer
                  </Button>
                </Box>
              </Box>
            </ListItem>
          ))}
        </List>
      )}

      <Dialog
        open={dialog.open}
        onClose={handleCloseDialog}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>
          {dialog.type === 'role'
            ? 'Changer le rôle du membre'
            : 'Changer le statut du membre'}
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>
              {dialog.type === 'role' ? 'Rôle' : 'Statut'}
            </InputLabel>
            <Select
              value={dialog.value}
              onChange={(e) => setDialog({ ...dialog, value: e.target.value })}
              label={dialog.type === 'role' ? 'Rôle' : 'Statut'}
            >
              {dialog.type === 'role'
                ? Object.entries(MEMBRE_ROLES).map(([key, value]) => (
                    <MenuItem key={key} value={value}>
                      {formatMemberRole(value)}
                    </MenuItem>
                  ))
                : Object.entries(MEMBRE_STATUS).map(([key, value]) => (
                    <MenuItem key={key} value={value}>
                      {formatMemberStatus(value)}
                    </MenuItem>
                  ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Annuler</Button>
          <Button
            onClick={dialog.type === 'role' ? handleUpdateRole : handleUpdateStatus}
            color="primary"
            variant="contained"
          >
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MembersList;