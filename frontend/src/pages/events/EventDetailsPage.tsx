import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  Button,
  Alert,
  IconButton,
  Chip,
  Divider,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
  Description as DescriptionIcon,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import eventService from '../../services/eventService';
import clubService from '../../services/clubService';
import { Event, Club } from '../../types';

const EventDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [event, setEvent] = useState<Event | null>(null);
  const [club, setClub] = useState<Club | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteError, setDeleteError] = useState('');

  useEffect(() => {
    if (id) {
      fetchEventDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchEventDetails = async () => {
    try {
      setIsLoading(true);
      const eventData = await eventService.getEvent(parseInt(id!));
      setEvent(eventData);
      
      // Fetch club details
      const clubData = await clubService.getClub(eventData.club);
      setClub(clubData);
      
      setError('');
    } catch (err: any) {
      setError(err.message || 'Failed to load event details');
      console.error('Error fetching event details:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/events');
  };

  const handleEdit = () => {
    navigate(`/events/${id}/edit`);
  };

  const handleDelete = async () => {
    if (!event || !window.confirm('Are you sure you want to delete this event?')) {
      return;
    }

    try {
      await eventService.deleteEvent(event.id);
      navigate('/events');
    } catch (err: any) {
      setDeleteError(err.message || 'Failed to delete event');
      console.error('Error deleting event:', err);
    }
  };

  const canEditOrDelete = () => {
    return user && event && (
      user.role === 'coordinator' && user.id === event.created_by
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'primary';
      case 'completed':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const getTypeColor = (type: string) => {
    return type === 'private' ? 'secondary' : 'info';
  };

  const formatDateTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateString;
    }
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading event details..." />;
  }

  if (error && !event) {
    return (
      <Container maxWidth="md">
        <Box sx={{ py: 4 }}>
          <Alert severity="error">
            {error}
          </Alert>
          <Button
            variant="outlined"
            onClick={handleBack}
            sx={{ mt: 2 }}
            startIcon={<ArrowBackIcon />}
          >
            Back to Events
          </Button>
        </Box>
      </Container>
    );
  }

  if (!event) {
    return (
      <Container maxWidth="md">
        <Box sx={{ py: 4 }}>
          <Alert severity="error">
            Event not found
          </Alert>
          <Button
            variant="outlined"
            onClick={handleBack}
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <IconButton onClick={handleBack} sx={{ mr: 2 }}>
              <ArrowBackIcon />
            </IconButton>
            <Box>
              <Typography variant="h4" component="h1" gutterBottom>
                {event.title}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                <Chip
                  label={event.status}
                  color={getStatusColor(event.status) as any}
                  size="small"
                />
                <Chip
                  label={event.event_type}
                  color={getTypeColor(event.event_type) as any}
                  size="small"
                  variant="outlined"
                />
              </Box>
            </Box>
          </Box>

          {/* Action Buttons */}
          {canEditOrDelete() && (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                onClick={handleEdit}
                color="primary"
                title="Edit Event"
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={handleDelete}
                color="error"
                title="Delete Event"
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          )}
        </Box>

        {/* Delete Error */}
        {deleteError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {deleteError}
          </Alert>
        )}

        {/* Event Details */}
        <Grid container spacing={3}>
          {/* Main Content */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <DescriptionIcon />
                Description
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
                {event.description}
              </Typography>

              <Divider sx={{ my: 3 }} />

              {/* Event Information */}
              <Typography variant="h6" gutterBottom>
                Event Information
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <TimeIcon color="action" />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Start Time
                      </Typography>
                      <Typography variant="body1">
                        {formatDateTime(event.start_time)}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <TimeIcon color="action" />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        End Time
                      </Typography>
                      <Typography variant="body1">
                        {formatDateTime(event.end_time)}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <LocationIcon color="action" />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Location
                      </Typography>
                      <Typography variant="body1">
                        {event.location}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Sidebar */}
          <Grid size={{ xs: 12, md: 4 }}>
            {/* Club Information */}
            {club && (
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Organized by
                  </Typography>
                  <Typography variant="h5" color="primary" gutterBottom>
                    {club.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {club.description}
                  </Typography>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => navigate(`/clubs/${club.id}`)}
                  >
                    View Club
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Quick Actions */}
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Actions
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {canEditOrDelete() && (
                    <>
                      <Button
                        variant="contained"
                        startIcon={<EditIcon />}
                        onClick={handleEdit}
                        fullWidth
                      >
                        Edit Event
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={handleDelete}
                        fullWidth
                      >
                        Delete Event
                      </Button>
                    </>
                  )}
                  <Button
                    variant="outlined"
                    onClick={handleBack}
                    fullWidth
                  >
                    Back to Events
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default EventDetailsPage;
