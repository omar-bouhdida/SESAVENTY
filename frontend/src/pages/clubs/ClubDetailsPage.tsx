import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  Grid,
  Chip,
  Button,
  Tab,
  Tabs,
  Alert,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
  Groups as GroupsIcon,
  Event as EventIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import clubService from '../../services/clubService';
import eventService from '../../services/eventService';
import { Club, Event as EventType } from '../../types';
import { CLUB_STATUS, USER_ROLES } from '../../utils/constants';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`club-tabpanel-${index}`}
      aria-labelledby={`club-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const ClubDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [club, setClub] = useState<Club | null>(null);
  const [events, setEvents] = useState<EventType[]>([]);
  const [members, setMembers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const [deleteDialog, setDeleteDialog] = useState(false);

  const fetchClubDetails = async () => {
    try {
      setIsLoading(true);
      const clubData = await clubService.getClub(parseInt(id!));
      setClub(clubData);
      
      // Fetch related data
      await Promise.all([
        fetchClubEvents(),
        fetchClubMembers(),
      ]);
      
      setError('');
    } catch (err: any) {
      setError('Failed to load club details');
      console.error('Error fetching club details:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchClubDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchClubEvents = async () => {
    try {
      const eventsData = await eventService.getEvents();
      // Filter events for this club
      const clubEvents = eventsData.results?.filter((event: EventType) => 
        event.club === parseInt(id!)
      ) || [];
      setEvents(clubEvents);
    } catch (err: any) {
      console.error('Error fetching club events:', err);
    }
  };

  const fetchClubMembers = async () => {
    try {
      // This would need to be implemented in the service
      // For now, we'll use mock data or leave empty
      setMembers([]);
    } catch (err: any) {
      console.error('Error fetching club members:', err);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleEdit = () => {
    navigate(`/clubs/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await clubService.deleteClub(parseInt(id!));
      navigate('/clubs');
    } catch (err: any) {
      setError('Failed to delete club');
      console.error('Error deleting club:', err);
    }
  };

  const canManageClub = () => {
    if (!club || !user) return false;
    return user.role === USER_ROLES.STUDENT_LIFE_OFFICER || 
           (user.role === USER_ROLES.COORDINATOR && club.coordinator?.id === user.id);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case CLUB_STATUS.ACTIVE:
        return 'success';
      case CLUB_STATUS.PENDING:
        return 'warning';
      case CLUB_STATUS.ARCHIVED:
        return 'default';
      default:
        return 'default';
    }
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading club details..." />;
  }

  if (!club) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 4, textAlign: 'center' }}>
          <Typography variant="h5" color="error">
            Club not found
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/clubs')}
            sx={{ mt: 2 }}
          >
            Back to Clubs
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <IconButton
            onClick={() => navigate('/clubs')}
            sx={{ mr: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4" component="h1" sx={{ flexGrow: 1 }}>
            {club.name}
          </Typography>
          
          {canManageClub() && (
            <Box>
              <IconButton
                onClick={(e) => setMenuAnchor(e.currentTarget)}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                anchorEl={menuAnchor}
                open={Boolean(menuAnchor)}
                onClose={() => setMenuAnchor(null)}
              >
                <MenuItem onClick={() => {
                  handleEdit();
                  setMenuAnchor(null);
                }}>
                  <EditIcon sx={{ mr: 1 }} fontSize="small" />
                  Edit Club
                </MenuItem>
                <MenuItem 
                  onClick={() => {
                    setDeleteDialog(true);
                    setMenuAnchor(null);
                  }}
                  sx={{ color: 'error.main' }}
                >
                  <DeleteIcon sx={{ mr: 1 }} fontSize="small" />
                  Delete Club
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Club Info Card */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 8 }}>
              <Box sx={{ mb: 2 }}>
                <Chip
                  label={club.status}
                  color={getStatusColor(club.status) as any}
                  sx={{ mb: 2 }}
                />
              </Box>
              
              <Typography variant="h6" gutterBottom>
                Description
              </Typography>
              <Typography variant="body1" paragraph>
                {club.description}
              </Typography>
            </Grid>
            
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="h6" gutterBottom>
                Club Information
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PersonIcon sx={{ mr: 1, color: 'text.secondary' }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Coordinator
                  </Typography>
                  <Typography variant="body1">
                    {club.coordinator?.first_name} {club.coordinator?.last_name}
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <EmailIcon sx={{ mr: 1, color: 'text.secondary' }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Contact
                  </Typography>
                  <Typography variant="body1">
                    {club.coordinator?.email}
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CalendarIcon sx={{ mr: 1, color: 'text.secondary' }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Created
                  </Typography>
                  <Typography variant="body1">
                    {new Date(club.created_at).toLocaleDateString()}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Tabs */}
        <Paper sx={{ mb: 3 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab
              icon={<EventIcon />}
              label={`Events (${events.length})`}
              iconPosition="start"
            />
            <Tab
              icon={<GroupsIcon />}
              label={`Members (${members.length})`}
              iconPosition="start"
            />
          </Tabs>

          <TabPanel value={activeTab} index={0}>
            {/* Events Tab */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                Club Events
              </Typography>
              {canManageClub() && (
                <Button
                  variant="contained"
                  onClick={() => navigate(`/events/create?club=${id}`)}
                  size="small"
                >
                  Create Event
                </Button>
              )}
            </Box>
            
            {events.length === 0 ? (
              <Box textAlign="center" py={4}>
                <EventIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  No events yet
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  This club hasn't organized any events.
                </Typography>
                {canManageClub() && (
                  <Button
                    variant="contained"
                    onClick={() => navigate(`/events/create?club=${id}`)}
                    sx={{ mt: 2 }}
                  >
                    Create First Event
                  </Button>
                )}
              </Box>
            ) : (
              <Grid container spacing={2}>
                {events.map((event) => (
                  <Grid size={{ xs: 12, md: 6 }} key={event.id}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          {event.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          {event.description.length > 100 
                            ? `${event.description.substring(0, 100)}...` 
                            : event.description}
                        </Typography>
                        
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            <strong>Date:</strong> {new Date(event.start_time).toLocaleDateString()}
                          </Typography>
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            <strong>Time:</strong> {new Date(event.start_time).toLocaleTimeString()} - {new Date(event.end_time).toLocaleTimeString()}
                          </Typography>
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            <strong>Location:</strong> {event.location}
                          </Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <Chip
                              label={event.status}
                              size="small"
                              color={event.status === 'upcoming' ? 'primary' : 'default'}
                            />
                            <Chip
                              label={event.event_type}
                              size="small"
                              variant="outlined"
                            />
                          </Box>
                          <Button
                            size="small"
                            onClick={() => navigate(`/events/${event.id}`)}
                          >
                            View Details
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </TabPanel>

          <TabPanel value={activeTab} index={1}>
            {/* Members Tab */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                Club Members
              </Typography>
              {canManageClub() && (
                <Button
                  variant="outlined"
                  onClick={() => navigate(`/clubs/${id}/members`)}
                  size="small"
                >
                  Manage Members
                </Button>
              )}
            </Box>
            
            {members.length === 0 ? (
              <Box textAlign="center" py={4}>
                <GroupsIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  No members yet
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  This club doesn't have any members.
                </Typography>
              </Box>
            ) : (
              <List>
                {members.map((member, index) => (
                  <ListItem key={index}>
                    <ListItemAvatar>
                      <Avatar>
                        {member.user?.first_name?.[0]}{member.user?.last_name?.[0]}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${member.user?.first_name} ${member.user?.last_name}`}
                      secondary={member.user?.email}
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </TabPanel>
        </Paper>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteDialog}
          onClose={() => setDeleteDialog(false)}
        >
          <DialogTitle>Delete Club</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete "{club.name}"? This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              color="error"
              variant="contained"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default ClubDetailsPage;
