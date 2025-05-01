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
import { useNavigate } from 'react-router-dom';
import { 
  Group as GroupIcon,
  ArrowForward as ArrowForwardIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { formatUserName } from '../../utils/formatters';

const ClubCard = ({ club }) => {
  const navigate = useNavigate();

  return (
    <Card
      component={Paper}
      elevation={1}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: (theme) => theme.shadows[8],
        },
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      {club.logo ? (
        <Box sx={{ position: 'relative', paddingTop: '56.25%' /* 16:9 aspect ratio */ }}>
          <CardMedia
            component="img"
            image={club.logo}
            alt={club.nom}
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
              background: (theme) => `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography 
              variant="h2" 
              sx={{ 
                color: 'white',
                fontWeight: 'bold',
                textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
              }}
            >
              {club.nom.charAt(0)}
            </Typography>
          </Box>
        </Box>
      )}

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
            {club.nom}
          </Typography>
          <Chip
            label={club.domaine}
            size="small"
            sx={{
              mb: 2,
              bgcolor: 'primary.light',
              color: 'primary.main',
              fontWeight: 500,
            }}
          />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              mb: 2,
              lineHeight: 1.6,
            }}
          >
            {club.description}
          </Typography>
        </Box>

        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={3}
        >
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
              {club.nombreMembres} membres
            </Typography>
          </Box>
          {club.coordinateur && (
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
                src={club.coordinateur.photo}
                alt={formatUserName(club.coordinateur)}
                sx={{ 
                  width: 24, 
                  height: 24, 
                  mr: 1,
                  border: '2px solid white',
                }}
              />
              <Typography variant="body2" color="text.secondary" fontWeight="medium">
                {formatUserName(club.coordinateur)}
              </Typography>
            </Box>
          )}
        </Box>

        <Box
          sx={{
            display: 'flex',
            gap: 1,
            justifyContent: 'stretch',
          }}
        >
          <Button
            fullWidth
            size="large"
            onClick={() => navigate(`/clubs/${club.id}`)}
            endIcon={<ArrowForwardIcon />}
            sx={{
              borderRadius: 2,
              py: 1,
              transition: 'all 0.2s',
              '&:hover': {
                transform: 'translateX(4px)',
              }
            }}
          >
            En savoir plus
          </Button>
          <Button
            fullWidth
            variant="contained"
            size="large"
            startIcon={<AddIcon />}
            onClick={() => navigate(`/clubs/${club.id}/join`)}
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
            Rejoindre
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ClubCard;