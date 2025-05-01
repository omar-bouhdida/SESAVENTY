import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Divider,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  AccountCircle,
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { formatUserName } from '../../utils/formatters';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await logout();
    handleClose();
    navigate('/');
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          sx={{ mr: 2, display: { sm: 'none' } }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            textDecoration: 'none',
            color: 'inherit',
            flexGrow: 1,
          }}
        >
          SESAVENTY
        </Typography>

        <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 2 }}>
          <Button color="inherit" component={Link} to="/clubs">
            Clubs
          </Button>
          <Button color="inherit" component={Link} to="/events">
            Événements
          </Button>
        </Box>

        {user ? (
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
            <IconButton color="inherit" sx={{ mr: 1 }}>
              <NotificationsIcon />
            </IconButton>

            <IconButton
              onClick={handleProfileClick}
              sx={{ p: 0 }}
            >
              {user.photo ? (
                <Avatar
                  src={user.photo}
                  alt={formatUserName(user)}
                />
              ) : (
                <AccountCircle />
              )}
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              onClick={handleClose}
            >
              <MenuItem
                onClick={() => navigate('/profile')}
              >
                Mon profil
              </MenuItem>

              {user.role === 'ETUDIANT' && (
                <MenuItem
                  onClick={() => navigate('/student/clubs')}
                >
                  Mes clubs
                </MenuItem>
              )}

              {user.role === 'COORDINATEUR' && (
                <MenuItem
                  onClick={() => navigate('/coordinator/dashboard')}
                >
                  Tableau de bord
                </MenuItem>
              )}

              {user.role === 'RESPONSABLE' && (
                <MenuItem
                  onClick={() => navigate('/responsable/dashboard')}
                >
                  Administration
                </MenuItem>
              )}

              <Divider />

              <MenuItem onClick={handleLogout}>
                Se déconnecter
              </MenuItem>
            </Menu>
          </Box>
        ) : (
          <Box>
            <Button
              color="inherit"
              component={Link}
              to="/login"
            >
              Se connecter
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              component={Link}
              to="/register"
              sx={{ ml: 1 }}
            >
              S'inscrire
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;