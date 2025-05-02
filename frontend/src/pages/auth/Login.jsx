import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
import { Visibility, VisibilityOff, ArrowBack, ArrowForward } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { Diamond } from '@mui/icons-material';

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
            <Diamond sx={{ color: '#6347FF', fontSize: 36 }} />
            <Typography variant="h4" component="span" sx={{ fontWeight: 'bold', color: '#6347FF', ml: 1 }}>
              SESAVENTY
            </Typography>
          </Box>
          
          <Box sx={{ mt: 12 }}>
            <Typography variant="h3" component="h1" sx={{ mb: 2, fontWeight: 'bold' }}>
              Welcome!
            </Typography>
            <Typography variant="h4" sx={{ mb: 1, fontWeight: 'medium' }}>
              Build, Create, and
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 'medium' }}>
              Innovate with Sesaventy
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
            <ArrowBack sx={{ fontSize: 18, mr: 1 }} />
            Back
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
            Sign In
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
              placeholder="Username or Email Address"
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
              placeholder="Password"
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
                      {showPassword ? <VisibilityOff /> : <Visibility />}
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
              <FormControlLabel
                control={
                  <Checkbox
                    name="remember"
                    checked={formData.remember}
                    onChange={handleChange}
                    sx={{
                      color: '#6347FF',
                      '&.Mui-checked': {
                        color: '#6347FF',
                      },
                    }}
                  />
                }
                label={
                  <Typography variant="body2">
                    Remember me
                  </Typography>
                }
              />
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
                Forgot password?
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
              Sign in <ArrowForward sx={{ fontSize: 20 }} />
            </button>

            <Box sx={{ textAlign: 'center', my: 3 }}>
              <Typography variant="body1" color="text.secondary">
                Or
              </Typography>
            </Box>

            <button
              type="button"
              style={{
                width: '100%',
                padding: '12px 20px',
                backgroundColor: 'white',
                color: '#333',
                border: '1px solid #e0e0e6',
                borderRadius: '30px',
                fontSize: '0.95rem',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginBottom: '24px',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Se connecter avec Google
            </button>

            <Typography variant="body1" align="center" color="text.secondary">
              Don't have an account? 
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
                Sign up
              </MuiLink>
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;