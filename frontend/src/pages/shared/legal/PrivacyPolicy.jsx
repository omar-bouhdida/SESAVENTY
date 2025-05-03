import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';

const PrivacyPolicy = () => {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper elevation={0} sx={{ p: { xs: 3, md: 6 }, borderRadius: 4, bgcolor: '#f9f9ff' }}>
        <Typography variant="h3" component="h1" sx={{ mb: 4, fontWeight: 'bold', textAlign: 'center', color: '#6347FF' }}>
          Politique de Confidentialité
        </Typography>

        <Box sx={{ '& > *:not(:last-child)': { mb: 4 } }}>
          <section>
            <Typography variant="h5" gutterBottom sx={{ color: '#6347FF', fontWeight: 600 }}>
              1. Collecte des données
            </Typography>
            <Typography variant="body1" paragraph>
              Nous collectons les informations suivantes :
            </Typography>
            <Typography component="ul" sx={{ pl: 2 }}>
              <li>Nom et prénom</li>
              <li>Adresse email universitaire</li>
              <li>Informations de profil</li>
              <li>Données d'utilisation de la plateforme</li>
            </Typography>
          </section>

          <section>
            <Typography variant="h5" gutterBottom sx={{ color: '#6347FF', fontWeight: 600 }}>
              2. Utilisation des données
            </Typography>
            <Typography variant="body1" paragraph>
              Vos données sont utilisées pour :
            </Typography>
            <Typography component="ul" sx={{ pl: 2 }}>
              <li>Gérer votre compte et votre profil</li>
              <li>Vous permettre de participer aux activités des clubs</li>
              <li>Vous informer des événements et actualités</li>
              <li>Améliorer nos services</li>
            </Typography>
          </section>

          <section>
            <Typography variant="h5" gutterBottom sx={{ color: '#6347FF', fontWeight: 600 }}>
              3. Protection des données
            </Typography>
            <Typography variant="body1" paragraph>
              Nous mettons en œuvre des mesures de sécurité pour protéger vos données personnelles contre tout accès, modification, divulgation ou destruction non autorisée.
            </Typography>
          </section>

          <section>
            <Typography variant="h5" gutterBottom sx={{ color: '#6347FF', fontWeight: 600 }}>
              4. Vos droits
            </Typography>
            <Typography variant="body1" paragraph>
              Vous disposez des droits suivants :
            </Typography>
            <Typography component="ul" sx={{ pl: 2 }}>
              <li>Accéder à vos données personnelles</li>
              <li>Rectifier vos données</li>
              <li>Supprimer votre compte</li>
              <li>Limiter le traitement de vos données</li>
              <li>Vous opposer au traitement de vos données</li>
            </Typography>
          </section>

          <section>
            <Typography variant="h5" gutterBottom sx={{ color: '#6347FF', fontWeight: 600 }}>
              5. Contact
            </Typography>
            <Typography variant="body1">
              Pour toute question concernant notre politique de confidentialité, contactez-nous à : sesaventy@gmail.com
            </Typography>
          </section>
        </Box>
      </Paper>
    </Container>
  );
};

export default PrivacyPolicy;