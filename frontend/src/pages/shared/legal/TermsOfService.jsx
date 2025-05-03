import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';

const TermsOfService = () => {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper elevation={0} sx={{ p: { xs: 3, md: 6 }, borderRadius: 4, bgcolor: '#f9f9ff' }}>
        <Typography variant="h3" component="h1" sx={{ mb: 4, fontWeight: 'bold', textAlign: 'center', color: '#6347FF' }}>
          Conditions d'Utilisation
        </Typography>

        <Box sx={{ '& > *:not(:last-child)': { mb: 4 } }}>
          <section>
            <Typography variant="h5" gutterBottom sx={{ color: '#6347FF', fontWeight: 600 }}>
              1. Acceptation des conditions
            </Typography>
            <Typography variant="body1" paragraph>
              En utilisant la plateforme SESAVENTY, vous acceptez d'être lié par les présentes conditions d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser la plateforme.
            </Typography>
          </section>

          <section>
            <Typography variant="h5" gutterBottom sx={{ color: '#6347FF', fontWeight: 600 }}>
              2. Admissibilité
            </Typography>
            <Typography variant="body1" paragraph>
              L'utilisation de SESAVENTY est réservée aux :
            </Typography>
            <Typography component="ul" sx={{ pl: 2 }}>
              <li>Étudiants inscrits à l'Université Sesame</li>
              <li>Personnel administratif autorisé</li>
              <li>Responsables des clubs</li>
            </Typography>
          </section>

          <section>
            <Typography variant="h5" gutterBottom sx={{ color: '#6347FF', fontWeight: 600 }}>
              3. Règles d'utilisation
            </Typography>
            <Typography variant="body1" paragraph>
              En utilisant la plateforme, vous vous engagez à :
            </Typography>
            <Typography component="ul" sx={{ pl: 2 }}>
              <li>Fournir des informations exactes et à jour</li>
              <li>Respecter les droits des autres utilisateurs</li>
              <li>Ne pas publier de contenu inapproprié ou offensant</li>
              <li>Ne pas utiliser la plateforme à des fins commerciales</li>
              <li>Respecter les règles de l'université</li>
            </Typography>
          </section>

          <section>
            <Typography variant="h5" gutterBottom sx={{ color: '#6347FF', fontWeight: 600 }}>
              4. Comptes utilisateurs
            </Typography>
            <Typography variant="body1" paragraph>
              Vous êtes responsable de :
            </Typography>
            <Typography component="ul" sx={{ pl: 2 }}>
              <li>Maintenir la confidentialité de votre mot de passe</li>
              <li>Toutes les activités sur votre compte</li>
              <li>Mettre à jour vos informations</li>
            </Typography>
          </section>

          <section>
            <Typography variant="h5" gutterBottom sx={{ color: '#6347FF', fontWeight: 600 }}>
              5. Propriété intellectuelle
            </Typography>
            <Typography variant="body1" paragraph>
              Tout le contenu de la plateforme (logos, textes, etc.) est la propriété de l'Université Sesame. Toute reproduction sans autorisation est interdite.
            </Typography>
          </section>

          <section>
            <Typography variant="h5" gutterBottom sx={{ color: '#6347FF', fontWeight: 600 }}>
              6. Modifications
            </Typography>
            <Typography variant="body1" paragraph>
              Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications seront effectives dès leur publication sur la plateforme.
            </Typography>
          </section>

          <section>
            <Typography variant="h5" gutterBottom sx={{ color: '#6347FF', fontWeight: 600 }}>
              7. Contact
            </Typography>
            <Typography variant="body1">
              Pour toute question concernant ces conditions d'utilisation, contactez-nous à : sesaventy@gmail.com
            </Typography>
          </section>
        </Box>
      </Paper>
    </Container>
  );
};

export default TermsOfService;