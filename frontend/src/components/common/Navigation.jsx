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
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery,
  ListItemButton,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home,
  Group,
  Event,
  AddCircle,
  Dashboard,
  Settings,
  Logout,
  KeyboardArrowRight as KeyboardArrowRightIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { formatUserName } from '../../utils/formatters';

const Navigation = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
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
      { text: 'Clubs', icon: <Group />, path: '/clubs' },
    ];

    if (!user) {
      return items;
    }

    switch (user.role) {
      case 'ETUDIANT':
        items.push(
          { text: 'Créer un club', icon: <AddCircle />, path: '/clubs/create' }
        );
        break;
      case 'RESPONSABLE':
        items.push(
          { text: 'Tableau de bord', icon: <Dashboard />, path: '/responsable/dashboard' },
          { text: 'Demandes de clubs', icon: <AddCircle />, path: '/responsable/requests' }
        );
        break;
      case 'COORDINATEUR':
        items.push(
          { text: 'Tableau de bord', icon: <Dashboard />, path: '/coordinateur/dashboard' },
          { text: 'Événements', icon: <Event />, path: '/coordinateur/events' },
          { text: 'Membres', icon: <Group />, path: '/coordinateur/members' }
        );
        break;
      case 'MEMBRE':
        items.push(
          { text: 'Événements', icon: <Event />, path: '/events' }
        );
        break;
    }

    return items;
  };

  const navigationItems = getNavigationItems();

  const drawer = (
    <Box>
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
              position: 'relative',
              '&.Mui-selected': {
                bgcolor: 'primary.light',
                color: 'primary.main',
                '&:hover': {
                  bgcolor: 'primary.light',
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 4,
                  height: '60%',
                  bgcolor: 'primary.main',
                  borderRadius: '0 4px 4px 0',
                },
              },
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: isActiveRoute(item.path) ? 'primary.main' : 'inherit',
                minWidth: 40,
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text}
              primaryTypographyProps={{
                fontWeight: isActiveRoute(item.path) ? 'medium' : 'regular',
              }}
            />
            {isActiveRoute(item.path) && (
              <KeyboardArrowRightIcon 
                sx={{ 
                  color: 'primary.main',
                  opacity: 0.8,
                }} 
              />
            )}
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
      keepMounted
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      PaperProps={{
        elevation: 3,
        sx: {
          mt: 1,
          '& .MuiMenuItem-root': {
            py: 1,
            px: 2,
          },
        },
      }}
    >
      {user && (
        <>
          <MenuItem onClick={() => {
            handleMenuClose();
            navigate('/profile');
          }}
          sx={{
            '&:hover': {
              bgcolor: 'action.hover',
              '& .MuiSvgIcon-root': {
                color: 'primary.main',
              },
            },
          }}
          >
            <Settings sx={{ mr: 2, color: 'action.active' }} />
            Paramètres
          </MenuItem>
          <MenuItem 
            onClick={handleLogout}
            sx={{
              color: 'error.main',
              '&:hover': {
                bgcolor: 'error.light',
                '& .MuiSvgIcon-root': {
                  color: 'error.main',
                },
              },
            }}
          >
            <Logout sx={{ mr: 2, color: 'inherit' }} />
            Déconnexion
          </MenuItem>
        </>
      )}
    </Menu>
  );

  return (
    <>
      <AppBar 
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: 'background.paper',
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            component="div"
            sx={{ 
              flexGrow: 1, 
              cursor: 'pointer',
              color: 'primary.main',
              fontWeight: 'bold',
              '&:hover': {
                opacity: 0.8,
              },
            }}
            onClick={() => navigate('/')}
          >
            SESAVENTY
          </Typography>

          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1 }}>
            {navigationItems.map((item) => (
              <Button
                key={item.text}
                startIcon={item.icon}
                onClick={() => navigate(item.path)}
                sx={{
                  color: isActiveRoute(item.path) ? 'primary.main' : 'text.primary',
                  bgcolor: isActiveRoute(item.path) ? 'primary.light' : 'transparent',
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  '&:hover': {
                    bgcolor: isActiveRoute(item.path) ? 'primary.light' : 'action.hover',
                  },
                }}
              >
                {item.text}
              </Button>
            ))}
          </Box>

          {user ? (
            <Box sx={{ ml: 2 }}>
              <IconButton
                onClick={handleProfileMenuOpen}
                size="small"
                sx={{ ml: 2 }}
              >
                <Avatar
                  src={user.photo}
                  alt={formatUserName(user)}
                  sx={{ 
                    width: 36, 
                    height: 36,
                    border: 2,
                    borderColor: 'primary.main',
                  }}
                >
                  {formatUserName(user).charAt(0)}
                </Avatar>
              </IconButton>
            </Box>
          ) : (
            <Box sx={{ ml: 2 }}>
              <Button
                color="inherit"
                onClick={() => navigate('/login')}
                sx={{
                  mr: 1,
                  '&:hover': {
                    color: 'primary.main',
                  },
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
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: (theme) => theme.shadows[4],
                  },
                }}
              >
                Inscription
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: 240 }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant={isMobile ? 'temporary' : 'permanent'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: 240,
              mt: '64px',
              borderRight: 1,
              borderColor: 'divider',
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      {renderProfileMenu}
    </>
  );
};

export default Navigation;