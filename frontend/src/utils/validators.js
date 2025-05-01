import { USER_ROLES, MEMBRE_ROLES, MEMBRE_STATUS, DEMANDE_STATUS } from './constants';

export const required = (value) => {
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return 'Ce champ est obligatoire';
  }
  return '';
};

export const email = (value) => {
  if (!value) return '';
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  if (!emailRegex.test(value)) {
    return 'Adresse email invalide';
  }
  return '';
};

export const validateEmail = (email) => {
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return regex.test(email);
};

export const password = (value) => {
  if (!value) return '';
  if (value.length < 8) {
    return 'Le mot de passe doit contenir au moins 8 caractères';
  }
  if (!/\d/.test(value)) {
    return 'Le mot de passe doit contenir au moins un chiffre';
  }
  if (!/[a-z]/.test(value)) {
    return 'Le mot de passe doit contenir au moins une minuscule';
  }
  if (!/[A-Z]/.test(value)) {
    return 'Le mot de passe doit contenir au moins une majuscule';
  }
  return '';
};

export const matchPassword = (value, compareValue) => {
  if (!value || !compareValue) return '';
  if (value !== compareValue) {
    return 'Les mots de passe ne correspondent pas';
  }
  return '';
};

export const phone = (value) => {
  if (!value) return '';
  const phoneRegex = /^\+?[\d\s-]{10,}$/;
  if (!phoneRegex.test(value)) {
    return 'Numéro de téléphone invalide';
  }
  return '';
};

export const validateRole = (role) => {
  if (!Object.values(USER_ROLES).includes(role)) {
    return 'Rôle utilisateur invalide';
  }
  return '';
};

export const validateMemberRole = (role) => {
  if (!Object.values(MEMBRE_ROLES).includes(role)) {
    return 'Rôle membre invalide';
  }
  return '';
};

export const validateMemberStatus = (status) => {
  if (!Object.values(MEMBRE_STATUS).includes(status)) {
    return 'Statut membre invalide';
  }
  return '';
};

export const validateRequestStatus = (status) => {
  if (!Object.values(DEMANDE_STATUS).includes(status)) {
    return 'Statut demande invalide';
  }
  return '';
};

export const maxLength = (max) => (value) => {
  if (!value) return '';
  if (value.length > max) {
    return `Maximum ${max} caractères autorisés`;
  }
  return '';
};

export const minLength = (min) => (value) => {
  if (!value) return '';
  if (value.length < min) {
    return `Minimum ${min} caractères requis`;
  }
  return '';
};

export const validateClubName = (value) => {
  if (!value) return required(value);
  if (value.length < 3) {
    return 'Le nom du club doit contenir au moins 3 caractères';
  }
  if (value.length > 50) {
    return 'Le nom du club ne doit pas dépasser 50 caractères';
  }
  return '';
};

export const validateObjectifs = (value) => {
  if (!value) return required(value);
  if (value.length < 50) {
    return 'Les objectifs doivent contenir au moins 50 caractères';
  }
  if (value.length > 1000) {
    return 'Les objectifs ne doivent pas dépasser 1000 caractères';
  }
  return '';
};

export const validateLettreMotivation = (value) => {
  if (!value) return required(value);
  if (value.length < 100) {
    return 'La lettre de motivation doit contenir au moins 100 caractères';
  }
  if (value.length > 1000) {
    return 'La lettre de motivation ne doit pas dépasser 1000 caractères';
  }
  return '';
};

export const validateEventDate = (date) => {
  if (!date) return required(date);
  const eventDate = new Date(date);
  const today = new Date();
  if (eventDate < today) {
    return 'La date doit être dans le futur';
  }
  return '';
};

export const validateImageFile = (file) => {
  if (!file) return '';
  const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (!validTypes.includes(file.type)) {
    return 'Format d\'image invalide. Formats acceptés: JPG, PNG, GIF';
  }
  if (file.size > 5 * 1024 * 1024) {
    return 'La taille de l\'image ne doit pas dépasser 5MB';
  }
  return '';
};