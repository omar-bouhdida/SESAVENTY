import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Chip,
  Avatar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Group as GroupIcon } from '@mui/icons-material';
import { formatUserName } from '../../utils/formatters';

const ClubCard = ({ club }) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {club.logo ? (
        <CardMedia
          component="img"
          height="140"
          image={club.logo}
          alt={club.nom}
        />
      ) : (
        <Box
          sx={{
            height: 140,
            bgcolor: 'primary.main',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h3" color="white">
            {club.nom.charAt(0)}
          </Typography>
        </Box>
      )}

      <CardContent sx={{ flexGrow: 1 }}>
        <Box mb={2}>
          <Typography variant="h6" gutterBottom>
            {club.nom}
          </Typography>
          <Chip
            label={club.domaine}
            size="small"
            sx={{ mb: 1 }}
          />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              mb: 2,
            }}
          >
            {club.description}
          </Typography>
        </Box>

        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Box display="flex" alignItems="center">
            <GroupIcon
              fontSize="small"
              sx={{ mr: 0.5, color: 'text.secondary' }}
            />
            <Typography variant="body2" color="text.secondary">
              {club.nombreMembres} membres
            </Typography>
          </Box>
          {club.coordinateur && (
            <Box display="flex" alignItems="center">
              <Avatar
                src={club.coordinateur.photo}
                alt={formatUserName(club.coordinateur)}
                sx={{ width: 24, height: 24, mr: 1 }}
              />
              <Typography variant="body2" color="text.secondary">
                {formatUserName(club.coordinateur)}
              </Typography>
            </Box>
          )}
        </Box>

        <Box
          sx={{
            display: 'flex',
            gap: 1,
            justifyContent: 'flex-end',
          }}
        >
          <Button
            size="small"
            onClick={() => navigate(`/clubs/${club.id}`)}
          >
            En savoir plus
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => navigate(`/clubs/${club.id}/join`)}
          >
            Rejoindre
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ClubCard;