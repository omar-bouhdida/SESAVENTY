import React from 'react';
import { Box, Breadcrumbs as MuiBreadcrumbs, Typography, Link } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  NavigateNext as NavigateNextIcon,
  Home as HomeIcon,
  Group as GroupIcon,
  Event as EventIcon,
  Dashboard as DashboardIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';

const iconMap = {
  home: <HomeIcon sx={{ mr: 0.5 }} fontSize="small" />,
  clubs: <GroupIcon sx={{ mr: 0.5 }} fontSize="small" />,
  events: <EventIcon sx={{ mr: 0.5 }} fontSize="small" />,
  dashboard: <DashboardIcon sx={{ mr: 0.5 }} fontSize="small" />,
  settings: <SettingsIcon sx={{ mr: 0.5 }} fontSize="small" />,
};

const pathNameMap = {
  clubs: 'Clubs',
  events: 'Événements',
  dashboard: 'Tableau de bord',
  settings: 'Paramètres',
  profile: 'Profil',
  create: 'Créer',
  join: 'Rejoindre',
  requests: 'Demandes',
  members: 'Membres',
  responsable: 'Responsable',
  coordinateur: 'Coordinateur',
  etudiant: 'Étudiant',
};

const Breadcrumbs = () => {
  const location = useLocation();

  const pathnames = location.pathname.split('/').filter((x) => x);
  
  const getBreadcrumbPath = (index) => {
    return '/' + pathnames.slice(0, index + 1).join('/');
  };

  const getIcon = (pathname) => {
    return iconMap[pathname] || null;
  };

  const getName = (pathname) => {
    return pathNameMap[pathname] || pathname;
  };

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        px: { xs: 2, sm: 3 },
        py: 1,
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <MuiBreadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        <Link
          component={RouterLink}
          to="/"
          color="inherit"
          sx={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          {iconMap.home}
          Accueil
        </Link>
        
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const path = getBreadcrumbPath(index);
          const icon = getIcon(value);
          const name = getName(value);

          return last ? (
            <Typography
              key={path}
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: 'text.primary',
                fontWeight: 'medium',
              }}
            >
              {icon}
              {name}
            </Typography>
          ) : (
            <Link
              key={path}
              component={RouterLink}
              to={path}
              color="inherit"
              sx={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              {icon}
              {name}
            </Link>
          );
        })}
      </MuiBreadcrumbs>
    </Box>
  );
};

export default Breadcrumbs;