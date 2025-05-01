import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  IconButton,
  Link as MuiLink,
  Alert,
  Stack,
  styled,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Person,
  Diamond,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { validateEmail } from '../../utils/validators';

const StyledTextField = styled('input')(({ theme }) => ({
  width: '100%',
  padding: '16px',
  paddingLeft: '42px',
  border: '1px solid',
  borderColor: theme.palette.divider,
  borderRadius: '8px',
  fontSize: '1rem',
  backgroundColor: 'transparent',
  transition: 'all 0.2s',
  '&:focus': {
    outline: 'none',
    borderColor: theme.palette.primary.main,
    backgroundColor: 'transparent',
  },
  '&::placeholder': {
    color: theme.palette.text.secondary,
  },
}));

const FloatingInputWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  '& .input-icon': {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: theme.palette.action.active,
    zIndex: 1,
  },
  '& .toggle-password': {
    position: 'absolute',
    right: '8px',
    top: '50%',
    transform: 'translateY(-50%)',
  },
}));

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName) {
      newErrors.firstName = 'Le prénom est requis';
    }
    
    if (!formData.lastName) {
      newErrors.lastName = 'Le nom est requis';
    }
    
    if (!formData.email) {
      newErrors.email = 'L\'email est requis';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email invalide';
    }
    
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'La confirmation du mot de passe est requise';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when field is modified
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      await register(formData);
      navigate('/dashboard');
    } catch (err) {
      setErrors(prev => ({
        ...prev,
        submit: err.response?.data?.message || 'Échec de l\'inscription'
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container sx={{ minHeight: '100vh' }}>
      <Grid item xs={12} md={6} sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        p: { xs: 2, md: 6 },
        backgroundColor: 'background.paper'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, gap: 1 }}>
          <Diamond sx={{ color: 'primary.main', fontSize: 32 }} />
          <Typography variant="h5" component="span" sx={{ fontWeight: 'bold' }}>
            SESAVENTY
          </Typography>
        </Box>

        <Box sx={{ maxWidth: 400, width: '100%', mx: 'auto' }}>
          <Typography variant="h4" component="h1" sx={{ mb: 1, fontWeight: 'bold' }}>
            Créer un compte
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Rejoignez SESAVENTY pour participer à la vie étudiante
          </Typography>

          {errors.submit && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errors.submit}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <FloatingInputWrapper sx={{ flex: 1 }}>
                  <Person className="input-icon" />
                  <StyledTextField
                    placeholder="Prénom"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                  {errors.firstName && (
                    <Typography color="error" variant="caption" sx={{ mt: 0.5, display: 'block' }}>
                      {errors.firstName}
                    </Typography>
                  )}
                </FloatingInputWrapper>

                <FloatingInputWrapper sx={{ flex: 1 }}>
                  <Person className="input-icon" />
                  <StyledTextField
                    placeholder="Nom"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                  {errors.lastName && (
                    <Typography color="error" variant="caption" sx={{ mt: 0.5, display: 'block' }}>
                      {errors.lastName}
                    </Typography>
                  )}
                </FloatingInputWrapper>
              </Box>

              <FloatingInputWrapper>
                <Email className="input-icon" />
                <StyledTextField
                  placeholder="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && (
                  <Typography color="error" variant="caption" sx={{ mt: 0.5, display: 'block' }}>
                    {errors.email}
                  </Typography>
                )}
              </FloatingInputWrapper>

              <Box sx={{ display: 'flex', gap: 2 }}>
                <FloatingInputWrapper sx={{ flex: 1 }}>
                  <Lock className="input-icon" />
                  <StyledTextField
                    placeholder="Mot de passe"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <IconButton
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    size="small"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                  {errors.password && (
                    <Typography color="error" variant="caption" sx={{ mt: 0.5, display: 'block' }}>
                      {errors.password}
                    </Typography>
                  )}
                </FloatingInputWrapper>

                <FloatingInputWrapper sx={{ flex: 1 }}>
                  <Lock className="input-icon" />
                  <StyledTextField
                    placeholder="Confirmer"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <IconButton
                    className="toggle-password"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                    size="small"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                  {errors.confirmPassword && (
                    <Typography color="error" variant="caption" sx={{ mt: 0.5, display: 'block' }}>
                      {errors.confirmPassword}
                    </Typography>
                  )}
                </FloatingInputWrapper>
              </Box>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#1976d2',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: '500',
                  cursor: loading ? 'default' : 'pointer',
                  opacity: loading ? 0.7 : 1,
                  transition: 'all 0.2s',
                  marginTop: '8px',
                }}
              >
                {loading ? 'Création du compte...' : 'S\'inscrire'}
              </button>

              <Typography variant="body2" align="center" color="text.secondary">
                Déjà membre?{' '}
                <MuiLink
                  component={Link}
                  to="/login"
                  color="primary"
                  underline="hover"
                  fontWeight="500"
                >
                  Se connecter
                </MuiLink>
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Grid>

      {/* Right side - Image with overlay */}
      <Grid item xs={12} md={6} sx={{
        display: { xs: 'none', md: 'flex' },
        position: 'relative',
        bgcolor: 'primary.dark',
      }}>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url(/images/students.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }
          }}
        />
        <Box
          sx={{
            position: 'relative',
            p: 6,
            color: 'white',
            alignSelf: 'flex-end',
          }}
        >
          <Typography variant="h3" gutterBottom fontWeight="bold">
            Rejoignez la Communauté
          </Typography>
          <Typography variant="h6">
            Participez à des événements et créez des liens avec d'autres étudiants
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Register;