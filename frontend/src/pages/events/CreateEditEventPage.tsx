import React, { useEffect, useState, useCallback } from 'react';
import {
  Box,
  Typography,
  Container,
  TextField,
  Button,
  Alert,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Paper,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import eventService from '../../services/eventService';
import clubService from '../../services/clubService';
import { EventForm, Club } from '../../types';

const CreateEditEventPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState<EventForm>({
    club: 0,
    title: '',
    description: '',
    start_time: '',
    end_time: '',
    location: '',
    event_type: 'public',
  });
  const [userClubs, setUserClubs] = useState<Club[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(isEdit);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchEventData = useCallback(async () => {
    try {
      setIsFetching(true);
      const event = await eventService.getEvent(parseInt(id!));
      setFormData({
        club: event.club,
        title: event.title,
        description: event.description,
        start_time: event.start_time.slice(0, 16), // Format for datetime-local input
        end_time: event.end_time.slice(0, 16),
        location: event.location,
        event_type: event.event_type,
      });
      setError('');
    } catch (err: any) {
      setError('Failed to load event data');
      console.error('Error fetching event:', err);
    } finally {
      setIsFetching(false);
    }
  }, [id]);

  const fetchUserClubs = useCallback(async () => {
    try {
      // For coordinators, fetch clubs they coordinate
      if (user?.role === 'coordinator') {
        const response = await clubService.getClubs();
        // Filter clubs where user is coordinator
        const coordinatedClubs = (response.results || response as any).filter(
          (club: Club) => club.coordinator.id === user.id
        );
        setUserClubs(coordinatedClubs);
        
        // If creating new event and user has clubs, set first club as default
        if (!isEdit && coordinatedClubs.length > 0) {
          setFormData(prev => ({ ...prev, club: coordinatedClubs[0].id }));
        }
      }
    } catch (err: any) {
      console.error('Error fetching user clubs:', err);
    }
  }, [user, isEdit]);

  useEffect(() => {
    fetchUserClubs();
  }, [fetchUserClubs]);

  useEffect(() => {
    if (isEdit && id) {
      fetchEventData();
    }
  }, [isEdit, id, fetchEventData]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (event: { target: { name: string; value: unknown } }) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.title.trim()) {
      setError('Event title is required');
      return false;
    }
    if (formData.title.length < 3) {
      setError('Event title must be at least 3 characters long');
      return false;
    }
    if (!formData.description.trim()) {
      setError('Event description is required');
      return false;
    }
    if (formData.description.length < 10) {
      setError('Event description must be at least 10 characters long');
      return false;
    }
    if (!formData.start_time) {
      setError('Start time is required');
      return false;
    }
    if (!formData.end_time) {
      setError('End time is required');
      return false;
    }
    if (new Date(formData.start_time) >= new Date(formData.end_time)) {
      setError('End time must be after start time');
      return false;
    }
    if (new Date(formData.start_time) <= new Date()) {
      setError('Start time must be in the future');
      return false;
    }
    if (!formData.location.trim()) {
      setError('Location is required');
      return false;
    }
    if (!formData.club) {
      setError('Please select a club');
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
      
      // Format datetime for backend
      const submitData = {
        ...formData,
        start_time: new Date(formData.start_time).toISOString(),
        end_time: new Date(formData.end_time).toISOString(),
      };
      
      if (isEdit && id) {
        await eventService.updateEvent(parseInt(id), submitData);
        setSuccess('Event updated successfully!');
        setTimeout(() => {
          navigate(`/events/${id}`);
        }, 1500);
      } else {
        const newEvent = await eventService.createEvent(submitData);
        setSuccess('Event created successfully!');
        setTimeout(() => {
          navigate(`/events/${newEvent.id}`);
        }, 1500);
      }
    } catch (err: any) {
      setError(err.message || `Failed to ${isEdit ? 'update' : 'create'} event`);
      console.error(`Error ${isEdit ? 'updating' : 'creating'} event:`, err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (isEdit && id) {
      navigate(`/events/${id}`);
    } else {
      navigate('/events');
    }
  };

  if (isFetching) {
    return <LoadingSpinner message="Loading event data..." />;
  }

  // Check if user has clubs to create events for
  if (!isEdit && userClubs.length === 0) {
    return (
      <Container maxWidth="md">
        <Box sx={{ py: 4 }}>
          <Alert severity="warning">
            You need to be a coordinator of at least one club to create events.
          </Alert>
          <Button
            variant="outlined"
            onClick={() => navigate('/events')}
            sx={{ mt: 2 }}
            startIcon={<ArrowBackIcon />}
          >
            Back to Events
          </Button>
        </Box>
      </Container>
    );
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
            {isEdit ? 'Edit Event' : 'Create New Event'}
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
              {/* Club Selection */}
              <Grid size={{ xs: 12 }}>
                <FormControl fullWidth required>
                  <InputLabel>Club</InputLabel>
                  <Select
                    name="club"
                    value={formData.club}
                    label="Club"
                    onChange={handleSelectChange}
                    disabled={isLoading || userClubs.length === 0}
                  >
                    {userClubs.map((club) => (
                      <MenuItem key={club.id} value={club.id}>
                        {club.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Event Title */}
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Event Title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                  helperText="Enter a clear and descriptive title for your event"
                />
              </Grid>

              {/* Event Description */}
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
                  helperText="Describe what the event is about, what to expect, and any requirements"
                />
              </Grid>

              {/* Start Time */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Start Time"
                  name="start_time"
                  type="datetime-local"
                  value={formData.start_time}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              {/* End Time */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="End Time"
                  name="end_time"
                  type="datetime-local"
                  value={formData.end_time}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              {/* Location */}
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                  helperText="Enter the venue or location where the event will take place"
                />
              </Grid>

              {/* Event Type */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth required>
                  <InputLabel>Event Type</InputLabel>
                  <Select
                    name="event_type"
                    value={formData.event_type}
                    label="Event Type"
                    onChange={handleSelectChange}
                    disabled={isLoading}
                  >
                    <MenuItem value="public">Public</MenuItem>
                    <MenuItem value="private">Private</MenuItem>
                  </Select>
                </FormControl>
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
                      : (isEdit ? 'Update Event' : 'Create Event')
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
            Event Creation Guidelines
          </Typography>
          <Typography variant="body2" color="text.secondary" component="div">
            <ul style={{ paddingLeft: '20px', margin: 0 }}>
              <li>Choose a clear and engaging title that describes your event</li>
              <li>Provide detailed information about what participants can expect</li>
              <li>Make sure the timing doesn't conflict with other major events</li>
              <li>Double-check the location and ensure it's accessible</li>
              <li>Public events are visible to all users, private events only to club members</li>
              <li>You can edit event details up until the start time</li>
            </ul>
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default CreateEditEventPage;
