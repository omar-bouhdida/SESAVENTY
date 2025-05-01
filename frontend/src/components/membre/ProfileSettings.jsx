import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Input,
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';
import useForm from '../../hooks/useForm';
import { validateImageFile } from '../../utils/validators';
import { formatUserName, getInitials } from '../../utils/formatters';

const ProfileSettings = () => {
  const { user, updateProfile, updatePassword } = useAuth();
  const { showNotification } = useNotification();
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(user?.photo);
  const [passwordDialog, setPasswordDialog] = useState(false);

  const {
    values: profileValues,
    errors: profileErrors,
    handleChange: handleProfileChange,
    handleSubmit: handleProfileSubmit,
  } = useForm(
    {
      nom: user?.nom || '',
      prenom: user?.prenom || '',
      email: user?.email || '',
    },
    async (values) => {
      setLoading(true);
      try {
        const formData = new FormData();
        Object.keys(values).forEach(key => {
          formData.append(key, values[key]);
        });
        if (photo) {
          formData.append('photo', photo);
        }
        await updateProfile(formData);
        showNotification('Profil mis à jour avec succès', 'success');
      } catch (error) {
        showNotification(
          'Erreur lors de la mise à jour du profil',
          'error'
        );
      } finally {
        setLoading(false);
      }
    }
  );

  const {
    values: passwordValues,
    errors: passwordErrors,
    handleChange: handlePasswordChange,
    handleSubmit: handlePasswordSubmit,
    resetForm: resetPasswordForm,
  } = useForm(
    {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    async (values) => {
      if (values.newPassword !== values.confirmNewPassword) {
        showNotification(
          'Les mots de passe ne correspondent pas',
          'error'
        );
        return;
      }
      
      setLoading(true);
      try {
        await updatePassword({
          oldPassword: values.currentPassword,
          newPassword: values.newPassword,
        });
        showNotification('Mot de passe mis à jour avec succès', 'success');
        setPasswordDialog(false);
        resetPasswordForm();
      } catch (error) {
        showNotification(
          'Erreur lors de la mise à jour du mot de passe',
          'error'
        );
      } finally {
        setLoading(false);
      }
    }
  );

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const error = validateImageFile(file);
      if (error) {
        showNotification(error, 'error');
        return;
      }
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Paramètres du profil
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <form onSubmit={handleProfileSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} display="flex" justifyContent="center">
              <Box position="relative">
                <Avatar
                  src={photoPreview}
                  alt={formatUserName(user)}
                  sx={{ width: 100, height: 100, mb: 2 }}
                >
                  {getInitials(user)}
                </Avatar>
                <Button
                  component="label"
                  sx={{
                    position: 'absolute',
                    bottom: 16,
                    right: -16,
                    minWidth: 'auto',
                    p: '6px',
                  }}
                >
                  <PhotoCamera />
                  <Input
                    type="file"
                    accept="image/*"
                    sx={{ display: 'none' }}
                    onChange={handlePhotoChange}
                  />
                </Button>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Prénom"
                name="prenom"
                value={profileValues.prenom}
                onChange={handleProfileChange}
                error={!!profileErrors.prenom}
                helperText={profileErrors.prenom}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nom"
                name="nom"
                value={profileValues.nom}
                onChange={handleProfileChange}
                error={!!profileErrors.nom}
                helperText={profileErrors.nom}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={profileValues.email}
                onChange={handleProfileChange}
                error={!!profileErrors.email}
                helperText={profileErrors.email}
              />
            </Grid>

            <Grid item xs={12}>
              <Box display="flex" gap={2}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Enregistrement...' : 'Enregistrer les modifications'}
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setPasswordDialog(true)}
                >
                  Changer le mot de passe
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Dialog
        open={passwordDialog}
        onClose={() => !loading && setPasswordDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <form onSubmit={handlePasswordSubmit}>
          <DialogTitle>Changer le mot de passe</DialogTitle>
          <DialogContent>
            <Box mt={2}>
              <TextField
                fullWidth
                margin="dense"
                label="Mot de passe actuel"
                name="currentPassword"
                type="password"
                value={passwordValues.currentPassword}
                onChange={handlePasswordChange}
                error={!!passwordErrors.currentPassword}
                helperText={passwordErrors.currentPassword}
              />
              <TextField
                fullWidth
                margin="dense"
                label="Nouveau mot de passe"
                name="newPassword"
                type="password"
                value={passwordValues.newPassword}
                onChange={handlePasswordChange}
                error={!!passwordErrors.newPassword}
                helperText={passwordErrors.newPassword}
              />
              <TextField
                fullWidth
                margin="dense"
                label="Confirmer le nouveau mot de passe"
                name="confirmNewPassword"
                type="password"
                value={passwordValues.confirmNewPassword}
                onChange={handlePasswordChange}
                error={!!passwordErrors.confirmNewPassword}
                helperText={passwordErrors.confirmNewPassword}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setPasswordDialog(false)}
              disabled={loading}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? 'Enregistrement...' : 'Mettre à jour'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default ProfileSettings;