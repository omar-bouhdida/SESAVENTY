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
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { formatUserName } from '../../utils/formatters';

const Navigation = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
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
          <ListItem
            button
            key={item.text}
            onClick={() => {
              navigate(item.path);
              if (isMobile) handleDrawerToggle();
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
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
    >
      {user && (
        <>
          <MenuItem onClick={() => {
            handleMenuClose();
            navigate('/profile');
          }}>
            <Settings sx={{ mr: 2 }} />
            Paramètres
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <Logout sx={{ mr: 2 }} />
            Déconnexion
          </MenuItem>
        </>
      )}
    </Menu>
  );

  return (
    <>
      <AppBar position="fixed">
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
            sx={{ flexGrow: 1, cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            SESAVENTY
          </Typography>

          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 2 }}>
            {navigationItems.map((item) => (
              <Button
                key={item.text}
                color="inherit"
                startIcon={item.icon}
                onClick={() => navigate(item.path)}
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
                  sx={{ width: 32, height: 32 }}
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
              >
                Connexion
              </Button>
              <Button
                color="inherit"
                onClick={() => navigate('/register')}
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
            keepMounted: true, // Better mobile performance
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: 240,
              mt: '64px', // Height of AppBar
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