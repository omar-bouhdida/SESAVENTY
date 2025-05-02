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
  Paper,
} from '@mui/material';
import {
  Event as EventIcon,
  LocationOn,
  Group as GroupIcon,
  ArrowForward as ArrowForwardIcon,
  AccessTime as AccessTimeIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useAnimation } from '../../hooks/useAnimation';

const EventCard = ({ event, index = 0 }) => {
  const navigate = useNavigate();
  const eventDate = new Date(event.dateDebut);
  const cardRef = useAnimation('fade-in slide-up', index * 0.1);

  return (
    <Card
      component={Paper}
      elevation={1}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: (theme) => theme.shadows[8],
        },
        borderRadius: 2,
        overflow: 'hidden',
      }}
      ref={cardRef}
    >
      <Box sx={{ position: 'relative' }}>
        {event.image ? (
          <Box sx={{ position: 'relative', paddingTop: '56.25%' }}>
            <CardMedia
              component="img"
              image={event.image}
              alt={event.titre}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            />
          </Box>
        ) : (
          <Box
            sx={{
              paddingTop: '56.25%',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: (theme) => `linear-gradient(45deg, ${theme.palette.secondary.main} 30%, ${theme.palette.secondary.light} 90%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <EventIcon 
                sx={{ 
                  fontSize: 80, 
                  color: 'white',
                  opacity: 0.8,
                }} 
              />
            </Box>
          </Box>
        )}
        
        {/* Date chip overlay */}
        <Chip
          icon={<AccessTimeIcon />}
          label={format(eventDate, "d MMM yyyy 'à' HH:mm", { locale: fr })}
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            bgcolor: 'white',
            color: 'primary.main',
            fontWeight: 500,
            boxShadow: 2,
            '& .MuiChip-icon': {
              color: 'primary.main',
            },
          }}
        />
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Box mb={2}>
          <Typography 
            variant="h6" 
            gutterBottom 
            sx={{ 
              fontWeight: 'bold',
              display: '-webkit-box',
              WebkitLineClamp: 1,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {event.titre}
          </Typography>
          
          <Box display="flex" gap={1} mb={2} flexWrap="wrap">
            <Chip
              size="small"
              label={event.type}
              sx={{
                bgcolor: 'secondary.light',
                color: 'secondary.main',
                fontWeight: 500,
              }}
            />
            {event.statut === 'OUVERT' && (
              <Chip
                size="small"
                label="Inscriptions ouvertes"
                sx={{
                  bgcolor: 'success.light',
                  color: 'success.dark',
                  fontWeight: 500,
                }}
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
              mb: 3,
              lineHeight: 1.6,
            }}
          >
            {event.description}
          </Typography>
        </Box>

        <Box
          display="flex"
          flexWrap="wrap"
          gap={2}
          mb={3}
        >
          {event.lieu && (
            <Box 
              display="flex" 
              alignItems="center"
              sx={{
                bgcolor: 'action.hover',
                px: 1.5,
                py: 0.5,
                borderRadius: 2,
              }}
            >
              <LocationOn
                fontSize="small"
                sx={{ mr: 1, color: 'text.secondary' }}
              />
              <Typography variant="body2" color="text.secondary" fontWeight="medium">
                {event.lieu}
              </Typography>
            </Box>
          )}

          <Box 
            display="flex" 
              alignItems="center"
              sx={{
                bgcolor: 'action.hover',
                px: 1.5,
                py: 0.5,
                borderRadius: 2,
              }}
            >
              <GroupIcon
                fontSize="small"
                sx={{ mr: 1, color: 'text.secondary' }}
              />
              <Typography variant="body2" color="text.secondary" fontWeight="medium">
                {event.nombreParticipants} / {event.capaciteMax || '∞'}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 3,
            }}
          >
            {event.club && (
              <Box 
                display="flex" 
                alignItems="center"
                sx={{
                  bgcolor: 'action.hover',
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 2,
                }}
              >
                <Avatar
                  src={event.club.logo}
                  alt={event.club.nom}
                  sx={{ 
                    width: 24, 
                    height: 24, 
                    mr: 1,
                    border: '2px solid white',
                  }}
                />
                <Typography variant="body2" color="text.secondary" fontWeight="medium">
                  {event.club.nom}
                </Typography>
              </Box>
            )}
          </Box>

          <Button
            fullWidth
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate(`/events/${event.id}`)}
            sx={{
              borderRadius: 2,
              py: 1,
              transition: 'all 0.2s',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: (theme) => theme.shadows[4],
              }
            }}
          >
            Voir les détails
          </Button>
        </CardContent>
      </Card>
    );
  };

  export default EventCard;
  