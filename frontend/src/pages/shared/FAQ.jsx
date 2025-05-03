import React from 'react';
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  Link,
} from '@mui/material';
import { ChevronDown } from 'lucide-react';

const FAQ = () => {
  const faqItems = [
    {
      question: "Qu'est-ce que cette plateforme ?",
      answer: "La plateforme de gestion des clubs étudiants de l'Université Sesame est un espace numérique dédié à la découverte, la participation et la création d'événements organisés par les clubs étudiants. Elle vise à centraliser les activités étudiantes et à renforcer la vie associative."
    },
    {
      question: "Qui peut utiliser cette plateforme ?",
      answer: "Tous les étudiants inscrits à l'Université Sesame peuvent accéder à la plateforme, que ce soit pour rejoindre un club, créer un événement ou y participer."
    },
    {
      question: "Comment rejoindre un club ?",
      answer: "Une fois connecté à votre compte étudiant :\n\n• Accédez à la section Clubs\n• Parcourez la liste des clubs disponibles\n• Cliquez sur \"Rejoindre\" pour devenir membre"
    },
    {
      question: "Puis-je créer mon propre club ?",
      answer: "Oui ! Si vous avez une idée originale ou une passion à partager :\n\n• Rendez-vous dans la section Créer un club\n• Remplissez le formulaire avec les informations nécessaires\n• Attendez la validation de l'administration de l'université"
    },
    {
      question: "Comment participer à un événement ?",
      answer: "Allez dans la section Événements, consultez les événements à venir, et cliquez sur \"Participer\". Vous recevrez ensuite toutes les informations par e-mail ou via votre tableau de bord."
    },
    {
      question: "Puis-je organiser un événement ?",
      answer: "Oui, si vous êtes membre d'un club, vous pouvez :\n\n• Proposer un événement via votre espace club\n• Ajouter les détails (lieu, date, objectif, etc.)\n• Soumettre pour approbation par l'administration universitaire"
    },
    {
      question: "Comment puis-je rester informé des nouveautés ?",
      answer: "Activez les notifications dans votre profil pour recevoir des alertes sur :\n\n• Les nouveaux événements\n• Les messages de votre club\n• Les annonces importantes de l'université"
    },
    {
      question: "Que faire en cas de problème technique ?",
      answer: "Contactez le support via la section Aide ou envoyez un e-mail à :\n📧 sesaventy@gmail.com"
    }
  ];

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper 
        elevation={0}
        sx={{ 
          p: { xs: 3, md: 6 },
          borderRadius: 4,
          bgcolor: '#f9f9ff',
        }}
      >
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
          Foire Aux Questions (FAQ)
        </Typography>

        <Box sx={{ mt: 4 }}>
          {faqItems.map((item, index) => (
            <Accordion
              key={index}
              sx={{
                mb: 2,
                border: 'none',
                '&:before': { display: 'none' },
                borderRadius: '16px !important',
                bgcolor: 'background.paper',
                boxShadow: 'none',
                '&:hover': {
                  bgcolor: 'rgba(99, 71, 255, 0.04)',
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ChevronDown size={24} color="#6347FF" />}
                sx={{
                  borderRadius: 4,
                  '& .MuiAccordionSummary-content': {
                    py: 1,
                  },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: 'text.primary',
                    fontSize: '1.1rem',
                  }}
                >
                  {item.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{
                    whiteSpace: 'pre-line',
                    lineHeight: 1.8,
                  }}
                >
                  {item.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Paper>
    </Container>
  );
};

export default FAQ;