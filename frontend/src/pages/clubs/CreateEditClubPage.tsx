import React, { useEffect, useState, useCallback } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  TextField,
  Button,
  Alert,
  IconButton,
  Grid,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import clubService from '../../services/clubService';
import { ClubForm } from '../../types';

const CreateEditClubPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState<ClubForm>({
    name: '',
    description: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(isEdit);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchClubData = useCallback(async () => {
    try {
      setIsFetching(true);
      const club = await clubService.getClub(parseInt(id!));
      setFormData({
        name: club.name,
        description: club.description,
      });
      setError('');
    } catch (err: any) {
      setError('Failed to load club data');
      console.error('Error fetching club:', err);
    } finally {
      setIsFetching(false);
    }
  }, [id]);

  useEffect(() => {
    if (isEdit && id) {
      fetchClubData();
    }
  }, [isEdit, id, fetchClubData]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setError('Club name is required');
      return false;
    }
    if (formData.name.length < 3) {
      setError('Club name must be at least 3 characters long');
      return false;
    }
    if (!formData.description.trim()) {
      setError('Club description is required');
      return false;
    }
    if (formData.description.length < 10) {
      setError('Club description must be at least 10 characters long');
      return false;
    }
    return true;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) {
      return;
    }

    try {
      setIsLoading(true);
      
      if (isEdit && id) {
        await clubService.updateClub(parseInt(id), formData);
        setSuccess('Club updated successfully!');
        setTimeout(() => {
          navigate(`/clubs/${id}`);
        }, 1500);
      } else {
        await clubService.createClubRequest(formData);
        setSuccess('Club creation request submitted successfully! It will be reviewed by the Student Life Office.');
        setTimeout(() => {
          navigate('/clubs');
        }, 2000);
      }
    } catch (err: any) {
      setError(err.message || `Failed to ${isEdit ? 'update' : 'create'} club`);
      console.error(`Error ${isEdit ? 'updating' : 'creating'} club:`, err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (isEdit && id) {
      navigate(`/clubs/${id}`);
    } else {
      navigate('/clubs');
    }
  };

  if (isFetching) {
    return <LoadingSpinner message="Loading club data..." />;
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <IconButton
            onClick={handleCancel}
            sx={{ mr: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4" component="h1">
            {isEdit ? 'Edit Club' : 'Create New Club'}
          </Typography>
        </Box>

        {/* Form */}
        <Paper sx={{ p: 4 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 3 }}>
              {success}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Club Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                  helperText="Enter a unique and descriptive name for your club"
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  multiline
                  rows={4}
                  disabled={isLoading}
                  helperText="Describe the purpose, activities, and goals of your club"
                />
              </Grid>

              {/* Action Buttons */}
              <Grid size={{ xs: 12 }}>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
                  <Button
                    variant="outlined"
                    onClick={handleCancel}
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<SaveIcon />}
                    disabled={isLoading}
                  >
                    {isLoading 
                      ? (isEdit ? 'Updating...' : 'Creating...') 
                      : (isEdit ? 'Update Club' : 'Create Club')
                    }
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Paper>

        {/* Guidelines */}
        <Paper sx={{ p: 3, mt: 3, bgcolor: 'background.default' }}>
          <Typography variant="h6" gutterBottom>
            Club Creation Guidelines
          </Typography>
          <Typography variant="body2" color="text.secondary" component="div">
            <ul style={{ paddingLeft: '20px', margin: 0 }}>
              <li>Choose a clear and unique name that reflects your club's purpose</li>
              <li>Provide a detailed description of your club's mission and activities</li>
              <li>Your club request will be reviewed by the Student Life Office</li>
              <li>You will be notified once your request is approved or needs revision</li>
              <li>Once approved, you can start inviting members and organizing events</li>
              <li>The approval process typically takes 3-5 business days</li>
            </ul>
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default CreateEditClubPage;
