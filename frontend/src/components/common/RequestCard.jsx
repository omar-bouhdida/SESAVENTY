import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Avatar,
  Chip,
  Divider,
} from '@mui/material';
import {
  Person as PersonIcon,
  School as SchoolIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { formatUserName } from '../../utils/formatters';

const RequestCard = ({ request, type, onApprove, onReject }) => {
  const isClubRequest = type === 'club';
  const date = new Date(request.dateCreation);

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardContent>
        <Box
          display="flex"
          alignItems="center"
          gap={2}
          mb={2}
        >
          <Avatar
            src={request.etudiant?.photo}
            alt={formatUserName(request.etudiant)}
          >
            <PersonIcon />
          </Avatar>
          <Box>
            <Typography variant="subtitle1">
              {formatUserName(request.etudiant)}
            </Typography>
            <Box display="flex" alignItems="center" gap={1}>
              <SchoolIcon
                fontSize="small"
                sx={{ color: 'text.secondary' }}
              />
              <Typography variant="body2" color="text.secondary">
                {request.etudiant?.filiere}
              </Typography>
            </Box>
          </Box>
        </Box>

        {isClubRequest ? (
          <>
            <Typography variant="h6" gutterBottom>
              {request.nomClub}
            </Typography>
            <Chip
              label={request.domaine}
              size="small"
              sx={{ mb: 2 }}
            />
          </>
        ) : (
          <Box mb={2}>
            <Typography variant="subtitle1" gutterBottom>
              Demande d'adhésion à {request.club?.nom}
            </Typography>
          </Box>
        )}

        <Typography
          variant="body2"
          color="text.secondary"
          paragraph
        >
          {request.motivation}
        </Typography>

        <Box
          display="flex"
          alignItems="center"
          gap={1}
          mb={2}
        >
          <CalendarIcon
            fontSize="small"
            sx={{ color: 'text.secondary' }}
          />
          <Typography variant="body2" color="text.secondary">
            Soumise le {format(date, 'd MMMM yyyy', { locale: fr })}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box
          display="flex"
          justifyContent="flex-end"
          gap={1}
        >
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => onReject(request.id)}
          >
            Refuser
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => onApprove(request.id)}
          >
            Approuver
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RequestCard;