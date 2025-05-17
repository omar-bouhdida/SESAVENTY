export const USER_ROLES = {
  ETUDIANT: 'ETUDIANT',
  COORDINATEUR: 'COORDINATEUR',
  RESPONSABLE: 'RESPONSABLE',
};

export const MEMBRE_ROLES = {
  MEMBRE: 'MEMBRE',
  COORDINATEUR: 'COORDINATEUR',
};

export const MEMBRE_STATUS = {
  MEMBRE: 'MEMBRE',
  SUSPENDU: 'SUSPENDU',
};

export const DEMANDE_STATUS = {
  EN_ATTENTE: 'EN_ATTENTE',
  ACCEPTEE: 'ACCEPTEE',
  REFUSEE: 'REFUSEE',
};

export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: {
      MEMBER: '/auth/register/member',
      COORDINATOR: '/auth/register/coordinator',
      RVA: '/auth/register/rva',
    },
    LOGOUT: '/auth/logout',
    PROFILE: '/auth/me',
    TOKEN: '/token',
    TOKEN_REFRESH: '/token/refresh',
    TOKEN_VERIFY: '/token/verify',
  },
  CLUBS: {
    BASE: '/clubs',
    REQUESTS: '/clubs/requests',
    MEMBERS: '/memberships',
  },
  EVENTS: {
    BASE: '/events',
  },
  USERS: {
    COORDINATORS: '/users/coordinators',
    MEMBERS: '/users/members',
    RVAS: '/users/rvas',
  },
};

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 25, 50],
};

export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ACCEPTED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif'],
  ACCEPTED_DOC_TYPES: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ],
};

export const DATE_FORMATS = {
  DISPLAY: 'MMMM D, YYYY',
  INPUT: 'YYYY-MM-DD',
  API: 'YYYY-MM-DD',
};

export const TIME_FORMATS = {
  DISPLAY: 'h:mm A',
  INPUT: 'HH:mm',
  API: 'HH:mm:ss',
};

export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_NAME_LENGTH: 50,
  MAX_DESCRIPTION_LENGTH: 500,
  MAX_TITLE_LENGTH: 100,
};