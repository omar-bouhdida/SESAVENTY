import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import {
  Box,
  Typography,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Checkbox,
  FormControlLabel,
  Link as MuiLink,
} from '@mui/material';
import { Eye, EyeOff, ArrowLeft, ArrowRight, Diamond } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login');
    }
  };

  return (
    <Grid container sx={{ minHeight: '100vh' }}>
      {/* Left side - Brand and welcome message */}
      <Grid item xs={12} md={6} sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'space-between',
        p: { xs: 4, md: 8 },
        backgroundColor: '#f1f0ff', // Light purple background
      }}>
        <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 12 }}>
    <img src={logo} alt="Logo" style={{ height: 36, width: 36 }} />
    <Typography variant="h4" component="span" sx={{ fontWeight: 'bold', color: '#6347FF', ml: 1 }}>
      SESAVENTY
    </Typography>
  </Box>
          
          <Box sx={{ mt: 12 }}>
            <Typography variant="h3" component="h1" sx={{ mb: 2, fontWeight: 'bold' }}>
            Bienvenu!
            </Typography>
            <Typography variant="h4" sx={{ mb: 1, fontWeight: 'medium' }}>
            Explorez, explorez
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 'medium' }}>
            Améliorez votre vie sur le campus
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ mt: 12 }}>
          <MuiLink
            component={Link}
            to="/"
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              color: 'text.primary',
              textDecoration: 'none',
              fontWeight: 500,
              '&:hover': { textDecoration: 'underline' }
            }}
          >
            <ArrowLeft size={20} />
            Retour
          </MuiLink>
        </Box>
      </Grid>

      {/* Right side - Login form */}
      <Grid item xs={12} md={6} sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center',
        p: { xs: 4, md: 8 },
        backgroundColor: 'background.paper'
      }}>
        <Box sx={{ maxWidth: 480, width: '100%', mx: 'auto' }}>
          <Typography variant="h3" component="h1" sx={{ mb: 6, fontWeight: 'bold', textAlign: 'center' }}>
            Se connecter
          </Typography>

          {error && (
            <Box sx={{ 
              mb: 3, 
              p: 2, 
              backgroundColor: '#fdeded', 
              color: '#d32f2f',
              borderRadius: 1
            }}>
              <Typography variant="body2">{error}</Typography>
            </Box>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              required
              fullWidth
              name="email"
              placeholder="Adresse email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              variant="outlined"
              sx={{ 
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 4,
                  backgroundColor: '#fff',
                  height: 56,
                  '& fieldset': {
                    borderColor: '#e0e0e6',
                    borderWidth: '2px',
                  },
                  '&:hover fieldset': {
                    borderColor: '#6347FF',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#6347FF',
                  },
                }
              }}
              InputLabelProps={{ shrink: false }}
            />

            <TextField
              required
              fullWidth
              name="password"
              placeholder="Mot de passe"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              variant="outlined"
              sx={{ 
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 4,
                  backgroundColor: '#fff',
                  height: 56,
                  '& fieldset': {
                    borderColor: '#e0e0e6',
                    borderWidth: '2px',
                  },
                  '&:hover fieldset': {
                    borderColor: '#6347FF',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#6347FF',
                  },
                }
              }}
              InputLabelProps={{ shrink: false }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              mb: 3
            }}>
              <MuiLink
                component={Link}
                to="/forgot-password"
                sx={{
                  color: 'text.secondary',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Mot de passe oublié ?
              </MuiLink>
            </Box>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '15px 20px',
                backgroundColor: '#6347FF',
                color: 'white',
                border: 'none',
                borderRadius: '30px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              Se connecter <ArrowRight size={20} />
            </button>

            <Box sx={{ textAlign: 'center', my: 3 }}>
              <Typography variant="body1" color="text.secondary">
                Ou
              </Typography>
            </Box>

            <Typography variant="body1" align="center" color="text.secondary">
            Vous n'avez pas de compte ?
              <MuiLink
                component={Link}
                to="/register"
                sx={{
                  color: '#6347FF',
                  textDecoration: 'none',
                  fontWeight: 600,
                  ml: 1,
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Registrez-vous
              </MuiLink>
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;