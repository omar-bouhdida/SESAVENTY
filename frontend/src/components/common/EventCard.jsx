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
import {
  Event as EventIcon,
  LocationOn,
  Group as GroupIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const EventCard = ({ event }) => {
  const navigate = useNavigate();
  const eventDate = new Date(event.dateDebut);

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {event.image ? (
        <CardMedia
          component="img"
          height="140"
          image={event.image}
          alt={event.titre}
        />
      ) : (
        <Box
          sx={{
            height: 140,
            bgcolor: 'secondary.main',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <EventIcon sx={{ fontSize: 60, color: 'white' }} />
        </Box>
      )}

      <CardContent sx={{ flexGrow: 1 }}>
        <Box mb={2}>
          <Typography variant="h6" gutterBottom>
            {event.titre}
          </Typography>
          
          <Box display="flex" gap={1} mb={1}>
            <Chip
              size="small"
              label={event.type}
              color="primary"
              variant="outlined"
            />
            {event.statut === 'OUVERT' && (
              <Chip
                size="small"
                label="Inscriptions ouvertes"
                color="success"
              />
            )}
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              mb: 2,
            }}
          >
            {event.description}
          </Typography>
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          gap={1}
          mb={2}
        >
          <Box display="flex" alignItems="center">
            <EventIcon
              fontSize="small"
              sx={{ mr: 1, color: 'text.secondary' }}
            />
            <Typography variant="body2" color="text.secondary">
              {format(eventDate, "EEEE d MMMM yyyy 'à' HH:mm", {
                locale: fr,
              })}
            </Typography>
          </Box>

          {event.lieu && (
            <Box display="flex" alignItems="center">
              <LocationOn
                fontSize="small"
                sx={{ mr: 1, color: 'text.secondary' }}
              />
              <Typography variant="body2" color="text.secondary">
                {event.lieu}
              </Typography>
            </Box>
          )}

          <Box display="flex" alignItems="center">
            <GroupIcon
              fontSize="small"
              sx={{ mr: 1, color: 'text.secondary' }}
            />
            <Typography variant="body2" color="text.secondary">
              {event.nombreParticipants} participants
              {event.capaciteMax && ` / ${event.capaciteMax} places`}
            </Typography>
          </Box>
        </Box>

        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box display="flex" alignItems="center">
            <Avatar
              src={event.club?.logo}
              alt={event.club?.nom}
              sx={{ width: 24, height: 24, mr: 1 }}
            />
            <Typography variant="body2" color="text.secondary">
              {event.club?.nom}
            </Typography>
          </Box>

          <Button
            variant="contained"
            size="small"
            onClick={() => navigate(`/events/${event.id}`)}
          >
            Détails
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default EventCard;