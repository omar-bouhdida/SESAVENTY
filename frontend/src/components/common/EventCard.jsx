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
  Calendar as EventIcon,
  MapPin as LocationIcon,
  Users as GroupIcon,
  ArrowRight as ArrowRightIcon,
  Clock as ClockIcon,
} from 'lucide-react';
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
      ref={cardRef}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: (theme) => theme.shadows[8],
          '& .arrow-icon': {
            transform: 'translateX(4px)',
          }
        },
      }}
    >
      <Box sx={{ position: 'relative', paddingTop: '56.25%' }}>
        <CardMedia
          component="img"
          image={event.image || '/default-event-cover.jpg'}
          alt={event.titre}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            display: 'flex',
            gap: 1,
          }}
        >
          {event.estPublic && (
            <Chip
              label="Public"
              size="small"
              sx={{
                bgcolor: 'success.light',
                color: 'success.dark',
                fontWeight: 500,
              }}
            />
          )}
        </Box>
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h6" gutterBottom fontWeight="bold">
          {event.titre}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 3,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: 1.6,
          }}
        >
          {event.description}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            mb: 3,
          }}
        >
          <Chip
            icon={<EventIcon size={16} />}
            label={format(eventDate, 'dd MMMM yyyy', { locale: fr })}
            size="small"
            sx={{
              bgcolor: 'action.hover',
              '& .MuiChip-icon': {
                color: 'text.secondary',
              },
            }}
          />
          {event.lieu && (
            <Chip
              icon={<LocationIcon size={16} />}
              label={event.lieu}
              size="small"
              sx={{
                bgcolor: 'action.hover',
                '& .MuiChip-icon': {
                  color: 'text.secondary',
                },
              }}
            />
          )}
          <Chip
            icon={<GroupIcon size={16} />}
            label={`${event.nombreParticipants || 0}/${event.capaciteMax || '∞'}`}
            size="small"
            sx={{
              bgcolor: 'action.hover',
              '& .MuiChip-icon': {
                color: 'text.secondary',
              },
            }}
          />
        </Box>

        {event.club && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 3,
              p: 1.5,
              borderRadius: 2,
              bgcolor: 'action.hover',
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

        <Button
          fullWidth
          variant="contained"
          endIcon={<ArrowRightIcon className="arrow-icon" />}
          onClick={() => navigate(`/events/${event.id}`)}
          sx={{
            py: 1.2,
            borderRadius: 2,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '& .arrow-icon': {
              transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            },
          }}
        >
          Voir les détails
        </Button>
      </CardContent>
    </Card>
  );
};

export default EventCard;
