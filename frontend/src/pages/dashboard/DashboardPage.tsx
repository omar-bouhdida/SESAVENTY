import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Alert,
} from '@mui/material';
import {
  Groups,
  Event,
  Person,
  TrendingUp,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import clubService from '../../services/clubService';
import eventService from '../../services/eventService';
import { Club, Event as EventType } from '../../types';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [clubs, setClubs] = useState<Club[]>([]);
  const [events, setEvents] = useState<EventType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const [clubsResponse, eventsResponse] = await Promise.all([
          clubService.getClubs(),
          eventService.getEvents(),
        ]);
        
        // Add null checks and default empty arrays if results are undefined
        setClubs(clubsResponse?.results?.slice(0, 6) || []);
        setEvents(eventsResponse?.results?.slice(0, 6) || []);
      } catch (err: any) {
        setError('Failed to load dashboard data');
        console.error('Dashboard error:', err);
        // Set empty arrays on error to prevent further issues
        setClubs([]);
        setEvents([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'pending':
        return 'warning';
      case 'upcoming':
        return 'info';
      case 'completed':
        return 'default';
      default:
        return 'default';
    }
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading dashboard..." />;
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome back, {user?.first_name}!
      </Typography>
      
      <Typography variant="body1" color="text.secondary" paragraph>
        Here's what's happening in your student engagement system.
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Stats Cards */}
      <Box 
        sx={{ 
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)'
          },
          gap: 3,
          mb: 4 
        }}
      >
        <Card>
          <CardContent>
            <Box display="flex" alignItems="center">
              <Groups color="primary" sx={{ mr: 2 }} />
              <Box>
                <Typography color="text.secondary" gutterBottom>
                  Active Clubs
                </Typography>
                <Typography variant="h4">
                  {clubs.filter(club => club.status === 'active').length}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent>
            <Box display="flex" alignItems="center">
              <Event color="secondary" sx={{ mr: 2 }} />
              <Box>
                <Typography color="text.secondary" gutterBottom>
                  Upcoming Events
                </Typography>
                <Typography variant="h4">
                  {events.filter(event => event.status === 'upcoming').length}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent>
            <Box display="flex" alignItems="center">
              <Person color="info" sx={{ mr: 2 }} />
              <Box>
                <Typography color="text.secondary" gutterBottom>
                  Your Role
                </Typography>
                <Typography variant="h6" sx={{ textTransform: 'capitalize' }}>
                  {user?.role.replace('_', ' ')}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent>
            <Box display="flex" alignItems="center">
              <TrendingUp color="success" sx={{ mr: 2 }} />
              <Box>
                <Typography color="text.secondary" gutterBottom>
                  Total Events
                </Typography>
                <Typography variant="h4">
                  {events.length}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Recent Clubs */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" component="h2">
          Recent Clubs
        </Typography>
        <Button variant="outlined" onClick={() => navigate('/clubs')}>
          View All Clubs
        </Button>
      </Box>
      {clubs.length === 0 ? (
        <Alert severity="info" sx={{ mb: 4 }}>
          No clubs available at the moment.
        </Alert>
      ) : (
        <Box 
          sx={{ 
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)'
            },
            gap: 3,
            mb: 4 
          }}
        >
          {clubs.map((club) => (
            <Card key={club.id}>
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom>
                  {club.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {club.description.length > 100 
                    ? `${club.description.substring(0, 100)}...` 
                    : club.description}
                </Typography>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Chip 
                    label={club.status} 
                    color={getStatusColor(club.status) as any}
                    size="small"
                  />
                  <Typography variant="caption" color="text.secondary">
                    By {club.coordinator.first_name} {club.coordinator.last_name}
                  </Typography>
                </Box>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => navigate(`/clubs/${club.id}`)}>
                  View Details
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      )}

      {/* Upcoming Events */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" component="h2">
          Upcoming Events
        </Typography>
        <Button variant="outlined" onClick={() => navigate('/events')}>
          View All Events
        </Button>
      </Box>
      {events.filter(event => event.status === 'upcoming').length === 0 ? (
        <Alert severity="info">
          No upcoming events at the moment.
        </Alert>
      ) : (
        <Box 
          sx={{ 
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)'
            },
            gap: 3
          }}
        >
          {events.filter(event => event.status === 'upcoming').map((event) => (
            <Card key={event.id}>
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom>
                  {event.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {event.description.length > 100 
                    ? `${event.description.substring(0, 100)}...` 
                    : event.description}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Start:</strong> {new Date(event.start_time).toLocaleDateString()} at {new Date(event.start_time).toLocaleTimeString()}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Location:</strong> {event.location}
                </Typography>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Chip 
                    label={event.event_type} 
                    color="primary"
                    size="small"
                  />
                  <Chip 
                    label={event.status} 
                    color={getStatusColor(event.status) as any}
                    size="small"
                  />
                </Box>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => navigate(`/events/${event.id}`)}>
                  View Details
                </Button>
                <Button size="small" color="primary">
                  Register
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default DashboardPage;