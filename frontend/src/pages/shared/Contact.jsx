import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Alert,
  Link,
  Divider,
} from '@mui/material';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this data to your backend
    // For now, we'll just show a success message
    setSubmitted(true);
    
    // Open mail client with pre-filled information
    const mailtoLink = `mailto:sesaventy@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`De: ${formData.name}\n\n${formData.message}`)}`;
    window.location.href = mailtoLink;
  };

  return (
    <Container maxWidth="lg">
      <Box py={8}>
        <Typography
          variant="h3"
          component="h1"
          sx={{
            mb: 4,
            fontWeight: 'bold',
            textAlign: 'center',
            color: '#6347FF',
          }}
        >
          Contactez-nous
        </Typography>

        <Grid container spacing={6}>
          <Grid item xs={12} md={5}>
            <Paper
              sx={{
                p: 4,
                height: '100%',
                bgcolor: '#f9f9ff',
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                Informations de contact
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                N'hésitez pas à nous contacter pour toute question ou suggestion.
                Notre équipe est là pour vous aider.
              </Typography>

              <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Mail size={24} color="#6347FF" />
                  <Box>
                    <Typography variant="subtitle2" gutterBottom>
                      Email
                    </Typography>
                    <Link
                      href="mailto:sesaventy@gmail.com"
                      sx={{
                        color: 'text.primary',
                        textDecoration: 'none',
                        '&:hover': { color: '#6347FF' },
                      }}
                    >
                      sesaventy@gmail.com
                    </Link>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Phone size={24} color="#6347FF" />
                  <Box>
                    <Typography variant="subtitle2" gutterBottom>
                      Téléphone
                    </Typography>
                    <Link
                      href="tel:+21671774777"
                      sx={{
                        color: 'text.primary',
                        textDecoration: 'none',
                        '&:hover': { color: '#6347FF' },
                      }}
                    >
                      (+216) 71 774 777
                    </Link>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <MapPin size={24} color="#6347FF" />
                  <Box>
                    <Typography variant="subtitle2" gutterBottom>
                      Adresse
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Pôle Technologique - El Ghazala
                      <br />
                      2088 Ariana, Tunisie
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={7}>
            <Paper
              sx={{
                p: 4,
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                },
              }}
            >
              {submitted ? (
                <Alert severity="success" sx={{ mb: 3 }}>
                  Votre message a été envoyé avec succès! Nous vous répondrons dans les plus brefs délais.
                </Alert>
              ) : null}

              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Nom complet"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Sujet"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      multiline
                      rows={4}
                      label="Message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      fullWidth
                      sx={{
                        height: 56,
                        bgcolor: '#6347FF',
                        '&:hover': {
                          bgcolor: '#5334FF',
                        },
                      }}
                      startIcon={<Send />}
                    >
                      Envoyer le message
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Contact;