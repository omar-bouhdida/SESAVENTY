import React, { useState } from 'react';
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Alert,
  Input as MuiInput,
} from '@mui/material';
import { UploadCloud } from 'lucide-react';
import { FILE_UPLOAD } from '../../utils/constants';
import { validateClubName, validateObjectifs, validateImageFile } from '../../utils/validators';
import useForm from '../../hooks/useForm';

const ClubRegistrationForm = ({ onSubmit, isLoading }) => {
  const [logo, setLogo] = useState(null);
  const [fileError, setFileError] = useState('');

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
  } = useForm(
    {
      nomClub: '',
      objectifs: '',
      typeActivite: '',
    },
    async (formValues) => {
      if (!logo) {
        setFileError('Le logo du club est obligatoire');
        return;
      }

      const formData = new FormData();
      formData.append('logo', logo);
      
      Object.keys(formValues).forEach((key) => {
        formData.append(key, formValues[key]);
      });

      await onSubmit(formData);
    }
  );

  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const error = validateImageFile(file);
      if (error) {
        setFileError(error);
        return;
      }
      setLogo(file);
      setFileError('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Créer un nouveau club
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="nomClub"
            name="nomClub"
            label="Nom du club"
            value={values.nomClub}
            onChange={handleChange}
            error={!!errors.nomClub}
            helperText={errors.nomClub || validateClubName(values.nomClub)}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="typeActivite"
            name="typeActivite"
            label="Type d'activité"
            value={values.typeActivite}
            onChange={handleChange}
            error={!!errors.typeActivite}
            helperText={errors.typeActivite}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            multiline
            rows={4}
            id="objectifs"
            name="objectifs"
            label="Objectifs du club"
            value={values.objectifs}
            onChange={handleChange}
            error={!!errors.objectifs}
            helperText={errors.objectifs || validateObjectifs(values.objectifs)}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            Logo du club
          </Typography>
          <Button
            component="label"
            variant="outlined"
            startIcon={<UploadCloud size={20} />}
            sx={{ mb: 2 }}
          >
            Télécharger le logo
            <MuiInput
              type="file"
              accept={FILE_UPLOAD.ACCEPTED_IMAGE_TYPES.join(',')}
              onChange={handleLogoChange}
              sx={{ display: 'none' }}
            />
          </Button>
          {logo && (
            <Typography variant="body2" sx={{ ml: 2 }}>
              Logo sélectionné: {logo.name}
            </Typography>
          )}
        </Grid>

        {fileError && (
          <Grid item xs={12}>
            <Alert severity="error">{fileError}</Alert>
          </Grid>
        )}

        <Grid item xs={12}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading}
          >
            {isLoading ? 'Envoi en cours...' : 'Soumettre la demande'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ClubRegistrationForm;