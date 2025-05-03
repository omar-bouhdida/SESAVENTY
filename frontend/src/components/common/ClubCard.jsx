import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Chip,
} from '@mui/material';
import {
  Users as MembersIcon,
  Calendar as EventIcon,
  ArrowRight as ArrowRightIcon,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAnimation } from '../../hooks/useAnimation';

const ClubCard = ({ club, index = 0 }) => {
  const navigate = useNavigate();
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
          image={club.logo || '/default-club-cover.jpg'}
          alt={club.nom}
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
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
            pt: 4,
            pb: 2,
            px: 2,
          }}
        >
          <Typography variant="h6" color="white" fontWeight="bold">
            {club.nom}
          </Typography>
          <Typography variant="body2" color="rgba(255,255,255,0.8)">
            {club.domaine}
          </Typography>
        </Box>
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 3,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: 1.6,
          }}
        >
          {club.description}
        </Typography>

        <Box 
          sx={{ 
            display: 'flex',
            gap: 2,
            mb: 3,
          }}
        >
          <Chip
            icon={<MembersIcon size={16} />}
            label={`${club.nombreMembres || 0} membres`}
            size="small"
            sx={{
              bgcolor: 'action.hover',
              '& .MuiChip-icon': {
                color: 'text.secondary',
              },
            }}
          />
          <Chip
            icon={<EventIcon size={16} />}
            label={`${club.nombreEvenements || 0} événements`}
            size="small"
            sx={{
              bgcolor: 'action.hover',
              '& .MuiChip-icon': {
                color: 'text.secondary',
              },
            }}
          />
        </Box>

        <Button
          fullWidth
          variant="contained"
          endIcon={<ArrowRightIcon className="arrow-icon" />}
          onClick={() => navigate(`/clubs/${club.id}`)}
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

export default ClubCard;