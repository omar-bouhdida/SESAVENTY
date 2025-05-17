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
import { useAuth } from '../../contexts/AuthProvider';
import { validateEmail } from '../../utils/validators';

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
    username: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    
    if (!formData.username) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      // Create the registration data in the format expected by the backend
      const registrationData = {
        username: formData.username,
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        password: formData.password,
      };
      
      console.log('Submitting registration with data:', {...registrationData, password: '***REDACTED***'});
      
      await register(registrationData);
      console.log('Registration successful, navigating to dashboard');
      navigate('/dashboard');
    } catch (err) {
      console.error('Registration error:', err);
      
      // Extract error message from different possible response formats
      let errorMessage = 'Registration failed';
      let fieldErrors = {};
      
      if (err.response) {
        if (err.response.data) {
          if (err.response.data.message) {
            errorMessage = err.response.data.message;
          } else if (err.response.data.detail) {
            errorMessage = err.response.data.detail;
          } else if (err.response.data.errors) {
            // Format validation errors nicely
            const validationErrors = err.response.data.errors;
            errorMessage = 'Validation errors: ';
            
            // Map backend field errors to form field names
            for (const field in validationErrors) {
              if (Object.prototype.hasOwnProperty.call(validationErrors, field)) {
                const errorMsg = validationErrors[field];
                errorMessage += `${field} - ${errorMsg}; `;
                
                // Map django field names to frontend field names
                switch(field) {
                  case 'username': 
                    fieldErrors.username = errorMsg;
                    break;
                  case 'first_name':
                    fieldErrors.firstName = errorMsg;
                    break;
                  case 'last_name':
                    fieldErrors.lastName = errorMsg;
                    break;
                  case 'email':
                    fieldErrors.email = errorMsg;
                    break;
                  case 'password':
                    fieldErrors.password = errorMsg;
                    break;
                  default:
                    // Keep other errors for the submit error message
                    break;
                }
              }
            }
          }
        } else {
          errorMessage = `Server error: ${err.response.status}`;
        }
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      // Update field-specific errors
      if (Object.keys(fieldErrors).length > 0) {
        setErrors(prev => ({
          ...prev,
          ...fieldErrors,
          submit: 'Please correct the errors in the form.'
        }));
      } else {
        setErrors(prev => ({
          ...prev,
          submit: errorMessage
        }));
      }
    } finally {
      setLoading(false);
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

      {/* Right side - Registration form */}
      <Grid item xs={12} md={6} sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center',
        p: { xs: 4, md: 8 },
        backgroundColor: 'background.paper'
      }}>
        <Box sx={{ maxWidth: 480, width: '100%', mx: 'auto' }}>
          <Typography variant="h3" component="h1" sx={{ mb: 6, fontWeight: 'bold', textAlign: 'center' }}>
          S'inscrire
          </Typography>

          {errors.submit && (
            <Box sx={{ 
              mb: 3, 
              p: 2, 
              backgroundColor: '#fdeded', 
              color: '#d32f2f',
              borderRadius: 1,
              border: '1px solid #ef9a9a'
            }}>
              <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                {errors.submit}
              </Typography>
              {errors.submit.includes('Validation errors') && (
                <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>
                  Please check all fields and try again.
                </Typography>
              )}
            </Box>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <TextField
                required
                fullWidth
                name="firstName"
                placeholder="Prénom"
                value={formData.firstName}
                onChange={handleChange}
                variant="outlined"
                error={!!errors.firstName}
                helperText={errors.firstName}
                sx={{ 
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
              />
              <TextField
                required
                fullWidth
                name="lastName"
                placeholder="Nom de famille"
                value={formData.lastName}
                onChange={handleChange}
                variant="outlined"
                error={!!errors.lastName}
                helperText={errors.lastName}
                sx={{ 
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
              />
            </Box>

            <TextField
              required
              fullWidth
              name="username"
              placeholder="Nom d'utilisateur"
              value={formData.username}
              onChange={handleChange}
              variant="outlined"
              error={!!errors.username}
              helperText={errors.username}
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
            />

            <TextField
              required
              fullWidth
              name="email"
              placeholder="Adresse email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              variant="outlined"
              error={!!errors.email}
              helperText={errors.email}
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
              error={!!errors.password}
              helperText={errors.password}
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

            <TextField
              required
              fullWidth
              name="confirmPassword"
              placeholder="Confirmez le mot de passe"
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={handleChange}
              variant="outlined"
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
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
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            
            <FormControlLabel
              control={
                <Checkbox 
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  sx={{
                    color: '#6347FF',
                    '&.Mui-checked': {
                      color: '#6347FF',
                    }
                  }}
                />
              }
              label={
                <Typography variant="body2">
                  J'accepte les <MuiLink href="/terms" color="primary">conditions d'utilisation</MuiLink> et la <MuiLink href="/privacy" color="primary">politique de confidentialité</MuiLink>
                </Typography>
              }
              sx={{ mb: 3 }}
            />
            {errors.agreeTerms && (
              <Typography color="error" variant="caption" sx={{ mt: -2, mb: 2, display: 'block' }}>
                {errors.agreeTerms}
              </Typography>
            )}
            
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '15px 20px',
                backgroundColor: '#6347FF',
                color: 'white',
                border: 'none',
                borderRadius: '30px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: loading ? 'default' : 'pointer',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? 'Création de compte...' : "S'inscrire"} <ArrowRight size={20} />
            </button>

            <Box sx={{ textAlign: 'center', my: 3 }}>
              <Typography variant="body1" color="text.secondary">
                Ou
              </Typography>
            </Box>

            <Typography variant="body1" align="center" color="text.secondary">
            Vous avez déjà un compte ? 
              <MuiLink
                component={Link}
                to="/login"
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
                Se connecter
              </MuiLink>
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Register;