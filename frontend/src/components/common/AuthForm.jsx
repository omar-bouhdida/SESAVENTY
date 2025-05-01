import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
} from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';
import useForm from '../../hooks/useForm';

const AuthForm = ({ mode = 'login' }) => {
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const { showNotification } = useNotification();

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
  } = useForm(
    {
      email: '',
      password: '',
      ...(mode === 'register' && {
        prenom: '',
        nom: '',
        confirmPassword: '',
      }),
    },
    async (formData) => {
      if (mode === 'register' && formData.password !== formData.confirmPassword) {
        showNotification(
          'Les mots de passe ne correspondent pas',
          'error'
        );
        return;
      }

      setLoading(true);
      try {
        if (mode === 'login') {
          await login(formData.email, formData.password);
        } else {
          const { confirmPassword, ...registerData } = formData;
          await register(registerData);
        }
      } catch (error) {
        showNotification(
          mode === 'login'
            ? 'Identifiants invalides'
            : 'Erreur lors de l\'inscription',
          'error'
        );
      } finally {
        setLoading(false);
      }
    }
  );

  return (
    <Paper sx={{ p: 3, maxWidth: 400, mx: 'auto' }}>
      <Typography variant="h5" align="center" gutterBottom>
        {mode === 'login' ? 'Connexion' : 'Inscription'}
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap={2}>
          {mode === 'register' && (
            <>
              <TextField
                required
                fullWidth
                label="Prénom"
                name="prenom"
                value={values.prenom || ''}
                onChange={handleChange}
                error={!!errors.prenom}
                helperText={errors.prenom}
                disabled={loading}
              />

              <TextField
                required
                fullWidth
                label="Nom"
                name="nom"
                value={values.nom || ''}
                onChange={handleChange}
                error={!!errors.nom}
                helperText={errors.nom}
                disabled={loading}
              />
            </>
          )}

          <TextField
            required
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            disabled={loading}
          />

          <TextField
            required
            fullWidth
            label="Mot de passe"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            disabled={loading}
          />

          {mode === 'register' && (
            <TextField
              required
              fullWidth
              label="Confirmer le mot de passe"
              name="confirmPassword"
              type="password"
              value={values.confirmPassword || ''}
              onChange={handleChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              disabled={loading}
            />
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? (
              <CircularProgress size={24} />
            ) : mode === 'login' ? (
              'Se connecter'
            ) : (
              'S\'inscrire'
            )}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default AuthForm;