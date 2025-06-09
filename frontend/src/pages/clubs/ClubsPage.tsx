import React, { useEffect, useState, useCallback } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  TextField,
  InputAdornment,
  Fab,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Groups as GroupsIcon,
  Person as PersonIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import clubService from '../../services/clubService';
import { Club, PaginatedResponse } from '../../types';
import { CLUB_STATUS, USER_ROLES } from '../../utils/constants';

const ClubsPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [clubs, setClubs] = useState<Club[]>([]);
  const [filteredClubs, setFilteredClubs] = useState<Club[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [deleteDialog, setDeleteDialog] = useState({ open: false, clubId: null as number | null });
  const [menuAnchor, setMenuAnchor] = useState<{ [key: number]: HTMLElement | null }>({});

  const fetchClubs = async () => {
    try {
      setIsLoading(true);
      const response: PaginatedResponse<Club> = await clubService.getClubs();
      setClubs(response.results || []);
      setError('');
    } catch (err: any) {
      setError('Failed to load clubs');
      console.error('Error fetching clubs:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const filterClubs = useCallback(() => {
    let filtered = clubs;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(club =>
        club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        club.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(club => club.status === statusFilter);
    }

    setFilteredClubs(filtered);
  }, [clubs, searchTerm, statusFilter]);

  useEffect(() => {
    fetchClubs();
  }, []);

  useEffect(() => {
    filterClubs();
  }, [filterClubs]);

  const handleCreateClub = () => {
    navigate('/clubs/create');
  };

  const handleViewClub = (clubId: number) => {
    navigate(`/clubs/${clubId}`);
  };

  const handleEditClub = (clubId: number) => {
    navigate(`/clubs/${clubId}/edit`);
  };

  const handleDeleteClub = async (clubId: number) => {
    try {
      await clubService.deleteClub(clubId);
      setClubs(prev => prev.filter(club => club.id !== clubId));
      setDeleteDialog({ open: false, clubId: null });
    } catch (err: any) {
      setError('Failed to delete club');
      console.error('Error deleting club:', err);
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, clubId: number) => {
    setMenuAnchor(prev => ({ ...prev, [clubId]: event.currentTarget }));
  };

  const handleMenuClose = (clubId: number) => {
    setMenuAnchor(prev => ({ ...prev, [clubId]: null }));
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

  const canManageClub = (club: Club) => {
    return user?.role === USER_ROLES.STUDENT_LIFE_OFFICER || 
           (user?.role === USER_ROLES.COORDINATOR && club.coordinator?.id === user.id);
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading clubs..." />;
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1">
            Student Clubs
          </Typography>
          
          {user?.role === USER_ROLES.COORDINATOR && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleCreateClub}
              size="large"
            >
              Create Club
            </Button>
          )}
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Search and Filters */}
        <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            placeholder="Search clubs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ flexGrow: 1, minWidth: 300 }}
          />
          
          <TextField
            select
            label="Status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            sx={{ minWidth: 120 }}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value={CLUB_STATUS.ACTIVE}>Active</MenuItem>
            <MenuItem value={CLUB_STATUS.PENDING}>Pending</MenuItem>
            <MenuItem value={CLUB_STATUS.ARCHIVED}>Archived</MenuItem>
          </TextField>
        </Box>

        {/* Clubs Grid */}
        {filteredClubs.length === 0 ? (
          <Box textAlign="center" py={8}>
            <GroupsIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              {searchTerm || statusFilter !== 'all' ? 'No clubs match your filters' : 'No clubs found'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user?.role === USER_ROLES.COORDINATOR && 'Be the first to create a club!'}
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {filteredClubs.map((club) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={club.id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: (theme) => theme.shadows[8],
                    },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Typography variant="h6" component="h3" gutterBottom>
                        {club.name}
                      </Typography>
                      
                      {canManageClub(club) && (
                        <Box>
                          <IconButton
                            size="small"
                            onClick={(e) => handleMenuOpen(e, club.id)}
                          >
                            <MoreVertIcon />
                          </IconButton>
                          <Menu
                            anchorEl={menuAnchor[club.id]}
                            open={Boolean(menuAnchor[club.id])}
                            onClose={() => handleMenuClose(club.id)}
                          >
                            <MenuItem onClick={() => {
                              handleEditClub(club.id);
                              handleMenuClose(club.id);
                            }}>
                              <EditIcon sx={{ mr: 1 }} fontSize="small" />
                              Edit
                            </MenuItem>
                            <MenuItem 
                              onClick={() => {
                                setDeleteDialog({ open: true, clubId: club.id });
                                handleMenuClose(club.id);
                              }}
                              sx={{ color: 'error.main' }}
                            >
                              <DeleteIcon sx={{ mr: 1 }} fontSize="small" />
                              Delete
                            </MenuItem>
                          </Menu>
                        </Box>
                      )}
                    </Box>

                    <Typography variant="body2" color="text.secondary" paragraph>
                      {club.description.length > 150 
                        ? `${club.description.substring(0, 150)}...` 
                        : club.description}
                    </Typography>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                      <Chip
                        label={club.status}
                        color={getStatusColor(club.status) as any}
                        size="small"
                      />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <PersonIcon fontSize="small" color="action" />
                        <Typography variant="caption" color="text.secondary">
                          {club.coordinator?.first_name} {club.coordinator?.last_name}
                        </Typography>
                      </Box>
                    </Box>

                    <Typography variant="caption" color="text.secondary">
                      Created {new Date(club.created_at).toLocaleDateString()}
                    </Typography>
                  </CardContent>

                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => handleViewClub(club.id)}
                      fullWidth
                    >
                      View Details
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Floating Action Button for Mobile */}
        {user?.role === USER_ROLES.COORDINATOR && (
          <Fab
            color="primary"
            aria-label="create club"
            onClick={handleCreateClub}
            sx={{
              position: 'fixed',
              bottom: 16,
              right: 16,
              display: { xs: 'flex', sm: 'none' },
            }}
          >
            <AddIcon />
          </Fab>
        )}

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteDialog.open}
          onClose={() => setDeleteDialog({ open: false, clubId: null })}
        >
          <DialogTitle>Delete Club</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete this club? This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialog({ open: false, clubId: null })}>
              Cancel
            </Button>
            <Button
              onClick={() => deleteDialog.clubId && handleDeleteClub(deleteDialog.clubId)}
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

export default ClubsPage;
