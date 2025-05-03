import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';

const LegalNotice = () => {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper elevation={0} sx={{ p: { xs: 3, md: 6 }, borderRadius: 4, bgcolor: '#f9f9ff' }}>
        <Typography variant="h3" component="h1" sx={{ mb: 4, fontWeight: 'bold', textAlign: 'center', color: '#6347FF' }}>
          Mentions Légales
        </Typography>

        <Box sx={{ '& > *:not(:last-child)': { mb: 4 } }}>
          <section>
            <Typography variant="h5" gutterBottom sx={{ color: '#6347FF', fontWeight: 600 }}>
              1. Éditeur du site
            </Typography>
            <Typography variant="body1" paragraph>
              SESAVENTY est une plateforme éditée par :
            </Typography>
            <Typography component="ul" sx={{ pl: 2 }}>
              <li>Université Sesame</li>
              <li>Pôle Technologique - El Ghazala</li>
              <li>2088 Ariana, Tunisie</li>
              <li>Tél : (+216) 71 774 777</li>
              <li>Email : sesaventy@gmail.com</li>
            </Typography>
          </section>

          <section>
            <Typography variant="h5" gutterBottom sx={{ color: '#6347FF', fontWeight: 600 }}>
              2. Hébergement
            </Typography>
            <Typography variant="body1" paragraph>
              Le site est hébergé par :
              [Informations de l'hébergeur]
            </Typography>
          </section>

          <section>
            <Typography variant="h5" gutterBottom sx={{ color: '#6347FF', fontWeight: 600 }}>
              3. Protection des données
            </Typography>
            <Typography variant="body1" paragraph>
              Conformément à la loi sur la protection des données personnelles, vous disposez d'un droit d'accès, de modification et de suppression des données vous concernant. Pour exercer ce droit, contactez-nous à l'adresse : sesaventy@gmail.com
            </Typography>
          </section>

          <section>
            <Typography variant="h5" gutterBottom sx={{ color: '#6347FF', fontWeight: 600 }}>
              4. Propriété intellectuelle
            </Typography>
            <Typography variant="body1" paragraph>
              L'ensemble du contenu du site SESAVENTY (logos, textes, éléments graphiques, vidéos, etc.) est la propriété exclusive de l'Université Sesame. Toute reproduction totale ou partielle du contenu est strictement interdite et est susceptible de constituer un délit de contrefaçon.
            </Typography>
          </section>

          <section>
            <Typography variant="h5" gutterBottom sx={{ color: '#6347FF', fontWeight: 600 }}>
              5. Cookies
            </Typography>
            <Typography variant="body1" paragraph>
              Le site utilise des cookies pour améliorer l'expérience utilisateur. En naviguant sur le site, vous acceptez leur utilisation. Ces cookies sont essentiels au bon fonctionnement du site et sont utilisés uniquement pour :
            </Typography>
            <Typography component="ul" sx={{ pl: 2 }}>
              <li>La gestion de votre session</li>
              <li>La mémorisation de vos préférences</li>
              <li>L'analyse de l'utilisation du site</li>
            </Typography>
          </section>

          <section>
            <Typography variant="h5" gutterBottom sx={{ color: '#6347FF', fontWeight: 600 }}>
              6. Liens externes
            </Typography>
            <Typography variant="body1" paragraph>
              SESAVENTY peut contenir des liens vers des sites externes. Nous n'avons aucun contrôle sur le contenu de ces sites et ne pouvons être tenus responsables de leur contenu.
            </Typography>
          </section>

          <section>
            <Typography variant="h5" gutterBottom sx={{ color: '#6347FF', fontWeight: 600 }}>
              7. Droit applicable
            </Typography>
            <Typography variant="body1">
              Les présentes mentions légales sont soumises au droit tunisien. En cas de litige, les tribunaux tunisiens seront seuls compétents.
            </Typography>
          </section>
        </Box>
      </Paper>
    </Container>
  );
};

export default LegalNotice;