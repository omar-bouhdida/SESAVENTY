import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  CircularProgress,
  Button,
  TextField,
  InputAdornment,
} from '@mui/material';
import { Search as SearchIcon, Add as AddIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import ClubCard from '../../components/common/ClubCard';
import { useClub } from '../../contexts/ClubContext';
import { useNotification } from '../../contexts/NotificationContext';
import { useAuth } from '../../contexts/AuthContext';

const Clubs = () => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [clubs, setClubs] = useState([]);
  const { getActiveClubs } = useClub();
  const { showNotification } = useNotification();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchClubs();
  }, []);

  const fetchClubs = async () => {
    try {
      setLoading(true);
      const data = await getActiveClubs();
      setClubs(data);
    } catch (error) {
      showNotification(
        'Erreur lors du chargement des clubs',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  const filteredClubs = clubs.filter(club => 
    club.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    club.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    club.domaine.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" my={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box py={4}>
        <Box 
          display="flex" 
          justifyContent="space-between" 
          alignItems="center" 
          mb={4}
        >
          <Typography variant="h4">
            Clubs étudiants
          </Typography>
          {user?.role === 'ETUDIANT' && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate('/clubs/create')}
            >
              Créer un club
            </Button>
          )}
        </Box>

        <TextField
          fullWidth
          variant="outlined"
          placeholder="Rechercher un club..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 4 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        {filteredClubs.length === 0 ? (
          <Typography color="text.secondary" align="center">
            Aucun club ne correspond à votre recherche
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {filteredClubs.map((club) => (
              <Grid item xs={12} sm={6} md={4} key={club.id}>
                <ClubCard club={club} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default Clubs;