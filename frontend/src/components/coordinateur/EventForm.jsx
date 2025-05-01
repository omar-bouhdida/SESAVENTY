import React from 'react';
import {
  Box,
  Grid,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  Typography,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/fr';
import dayjs from 'dayjs';
import useForm from '../../hooks/useForm';
import { validateEventDate } from '../../utils/validators';

const EventForm = ({ initialData, onSubmit, isLoading }) => {
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useForm(
    {
      titre: initialData?.titre || '',
      description: initialData?.description || '',
      lieu: initialData?.lieu || '',
      date: initialData?.dateHeure ? dayjs(initialData.dateHeure) : null,
      heure: initialData?.dateHeure ? dayjs(initialData.dateHeure) : null,
      estPublic: initialData?.estPublic || false,
    },
    async (formValues) => {
      const { date, heure, ...rest } = formValues;
      const dateHeure = dayjs(date)
        .hour(heure.hour())
        .minute(heure.minute())
        .second(0)
        .toISOString();

      await onSubmit({
        ...rest,
        dateHeure,
      });
    }
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              {initialData ? 'Modifier l\'événement' : 'Créer un nouvel événement'}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="titre"
              name="titre"
              label="Titre de l'événement"
              value={values.titre}
              onChange={handleChange}
              error={!!errors.titre}
              helperText={errors.titre}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              multiline
              rows={4}
              id="description"
              name="description"
              label="Description"
              value={values.description}
              onChange={handleChange}
              error={!!errors.description}
              helperText={errors.description}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="lieu"
              name="lieu"
              label="Lieu"
              value={values.lieu}
              onChange={handleChange}
              error={!!errors.lieu}
              helperText={errors.lieu}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <DatePicker
              label="Date"
              value={values.date}
              onChange={(newValue) => setFieldValue('date', newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  fullWidth
                  error={!!errors.date}
                  helperText={errors.date || validateEventDate(values.date)}
                />
              )}
              disablePast
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TimePicker
              label="Heure"
              value={values.heure}
              onChange={(newValue) => setFieldValue('heure', newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  fullWidth
                  error={!!errors.heure}
                  helperText={errors.heure}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={values.estPublic}
                  onChange={(e) => setFieldValue('estPublic', e.target.checked)}
                  name="estPublic"
                  color="primary"
                />
              }
              label="Événement public"
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
            >
              {isLoading
                ? 'Enregistrement...'
                : initialData
                ? 'Mettre à jour'
                : 'Créer l\'événement'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  );
};

export default EventForm;