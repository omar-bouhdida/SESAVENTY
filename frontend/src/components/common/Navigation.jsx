import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Button,
  Avatar,
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery,
  ListItemButton,
  Badge,
  Chip,
} from '@mui/material';
import logo from '../../assets/logo.png';
import {
  Menu as MenuIcon,
  Home,
  Users as ClubsIcon,
  Calendar as EventsIcon,
  PlusCircle as AddIcon,
  LayoutDashboard as DashboardIcon,
  Settings,
  LogOut,
  Bell as NotificationsIcon,
  User as AccountIcon,
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { formatUserName } from '../../utils/formatters';

const Navigation = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationsOpen = (event) => {
    setNotificationsAnchorEl(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setNotificationsAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
    navigate('/login');
  };

  const isActiveRoute = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const getNavigationItems = () => {
    const items = [
      { text: 'Accueil', icon: <Home />, path: '/' },
      { text: 'Clubs', icon: <ClubsIcon />, path: '/clubs' },
    ];

    if (!user) {
      return items;
    }

    switch (user.role) {
      case 'ETUDIANT':
        items.push(
          { text: 'Créer un club', icon: <AddIcon />, path: '/clubs/create' }
        );
        break;
      case 'RESPONSABLE':
        items.push(
          { text: 'Tableau de bord', icon: <DashboardIcon />, path: '/responsable/dashboard' },
          { text: 'Demandes', icon: <AddIcon />, path: '/responsable/requests' }
        );
        break;
      case 'COORDINATEUR':
        items.push(
          { text: 'Dashboard', icon: <DashboardIcon />, path: '/coordinateur/dashboard' },
          { text: 'Événements', icon: <EventsIcon />, path: '/coordinateur/events' },
          { text: 'Membres', icon: <ClubsIcon />, path: '/coordinateur/members' }
        );
        break;
      case 'MEMBRE':
        items.push(
          { text: 'Événements', icon: <EventsIcon />, path: '/events' }
        );
        break;
    }

    return items;
  };

  const navigationItems = getNavigationItems();

  const drawer = (
    <Box sx={{ pt: 1 }}>
      <List>
        {navigationItems.map((item) => (
          <ListItemButton
            key={item.text}
            onClick={() => {
              navigate(item.path);
              if (isMobile) handleDrawerToggle();
            }}
            selected={isActiveRoute(item.path)}
            sx={{
              borderRadius: 1,
              mx: 1,
              mb: 0.5,
              '&.Mui-selected': {
                backgroundColor: 'rgba(25, 118, 210, 0.08)',
                color: theme.palette.primary.main,
                '& .MuiListItemIcon-root': {
                  color: theme.palette.primary.main,
                },
              },
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text}
              primaryTypographyProps={{
                fontWeight: isActiveRoute(item.path) ? '600' : '400',
              }}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  const renderProfileMenu = (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
      PaperProps={{
        elevation: 3,
        sx: {
          mt: 1,
          minWidth: 200,
          '& .MuiMenuItem-root': {
            py: 1,
            px: 2,
          },
        },
      }}
    >
      <MenuItem 
        onClick={() => {
          handleMenuClose();
          navigate('/profile');
        }}
        sx={{
          '&:hover': {
            backgroundColor: 'rgba(25, 118, 210, 0.08)',
            color: theme.palette.primary.main,
          },
        }}
      >
        <ListItemIcon>
          <AccountIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Mon Profil</ListItemText>
      </MenuItem>
      <MenuItem 
        onClick={() => {
          handleMenuClose();
          navigate('/settings');
        }}
        sx={{
          '&:hover': {
            backgroundColor: 'rgba(25, 118, 210, 0.08)',
            color: theme.palette.primary.main,
          },
        }}
      >
        <ListItemIcon>
          <Settings fontSize="small" />
        </ListItemIcon>
        <ListItemText>Paramètres</ListItemText>
      </MenuItem>
      <Divider />
      <MenuItem 
        onClick={handleLogout}
        sx={{
          color: theme.palette.error.main,
          '&:hover': {
            backgroundColor: 'rgba(244, 67, 54, 0.08)',
          },
        }}
      >
        <ListItemIcon sx={{ color: 'inherit' }}>
          <LogOut fontSize="small" />
        </ListItemIcon>
        <ListItemText>Déconnexion</ListItemText>
      </MenuItem>
    </Menu>
  );

  const renderNotificationsMenu = (
    <Menu
      anchorEl={notificationsAnchorEl}
      open={Boolean(notificationsAnchorEl)}
      onClose={handleNotificationsClose}
      PaperProps={{
        elevation: 3,
        sx: {
          mt: 1,
          width: 320,
          maxHeight: 400,
          '& .MuiMenuItem-root': {
            py: 1,
            px: 2,
          },
        },
      }}
    >
      <MenuItem dense sx={{ justifyContent: 'space-between' }}>
        <Typography variant="subtitle1" fontWeight="600">
          Notifications
        </Typography>
        <Chip label="3 nouvelles" size="small" color="primary" />
      </MenuItem>
      <Divider />
      {/* Sample notifications */}
      <MenuItem>
        <ListItemText 
          primary="Nouvel événement créé"
          secondary="Il y a 2 heures"
        />
      </MenuItem>
      <MenuItem>
        <ListItemText 
          primary="Votre demande a été approuvée"
          secondary="Hier"
        />
      </MenuItem>
      <MenuItem>
        <ListItemText 
          primary="Nouveau message dans le club"
          secondary="2 jours"
        />
      </MenuItem>
      <Divider />
      <MenuItem sx={{ justifyContent: 'center' }}>
        <Button size="small">Voir toutes les notifications</Button>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <AppBar 
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: 'background.paper',
          borderBottom: `1px solid ${theme.palette.divider}`,
          backdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <Toolbar sx={{ px: { xs: 2, md: 3 } }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ 
              mr: 2, 
              display: { md: 'none' },
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'rotate(90deg)',
              }
            }}
          >
            <MenuIcon />
          </IconButton>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-2px)',
              }
            }}
            onClick={() => navigate('/')}
          >
            <img src={logo} alt="Logo" style={{ height: 36, width: 36, marginRight: 8 }} />
            <Typography
              variant="h6"
              sx={{ 
                color: theme.palette.primary.main,
                fontWeight: '700',
                fontFamily: '"Roboto Condensed", sans-serif',
                letterSpacing: '0.5px',
              }}
            >
              SESAVENTY
            </Typography>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 4, gap: 1 }}>
            {navigationItems.map((item) => (
              <Button
                key={item.text}
                startIcon={item.icon}
                onClick={() => navigate(item.path)}
                sx={{
                  color: isActiveRoute(item.path) 
                    ? theme.palette.primary.main 
                    : theme.palette.text.primary,
                  fontWeight: isActiveRoute(item.path) ? '600' : '400',
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  transition: 'all 0.2s',
                  '&:hover': {
                    bgcolor: 'action.hover',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                {item.text}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {user ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton
                onClick={handleNotificationsOpen}
                sx={{
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                  }
                }}
              >
                <Badge badgeContent={3} color="primary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>

              <IconButton
                onClick={handleProfileMenuOpen}
                sx={{
                  transition: 'all 0.2s',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                  }
                }}
              >
                {user.photo ? (
                  <Avatar
                    src={user.photo}
                    alt={formatUserName(user)}
                    sx={{
                      width: 36,
                      height: 36,
                      border: `2px solid ${theme.palette.primary.main}`,
                    }}
                  />
                ) : (
                  <Avatar
                    sx={{
                      width: 36,
                      height: 36,
                      bgcolor: theme.palette.primary.main,
                      color: 'white',
                      fontWeight: '600',
                    }}
                  >
                    {formatUserName(user).charAt(0)}
                  </Avatar>
                )}
              </IconButton>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                onClick={() => navigate('/login')}
                sx={{
                  px: 3,
                  borderRadius: 2,
                  fontWeight: '600',
                  transition: 'all 0.2s',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                  }
                }}
              >
                Connexion
              </Button>
              <Button
                variant="contained"
                onClick={() => navigate('/register')}
                sx={{
                  px: 3,
                  borderRadius: 2,
                  fontWeight: '600',
                  boxShadow: 'none',
                  transition: 'all 0.2s',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: theme.shadows[2],
                  }
                }}
              >
                Inscription
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Box component="nav">
        <Drawer
          variant={isMobile ? 'temporary' : 'permanent'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              width: 280,
              boxSizing: 'border-box',
              mt: '64px',
              borderRight: `1px solid ${theme.palette.divider}`,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      {renderProfileMenu}
      {renderNotificationsMenu}
    </>
  );
};

export default Navigation;