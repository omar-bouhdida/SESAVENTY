// API Configuration
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8000';

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login/',
    REGISTER_MEMBER: '/auth/register/member/',
    REGISTER_COORDINATOR: '/auth/register/coordinator/',
    REGISTER_RVA: '/auth/register/rva/',
    ME: '/auth/me/',
  },
  
  // Users
  USERS: {
    COORDINATORS: '/users/coordinators/',
    MEMBERS: '/users/members/',
    RVAS: '/users/rvas/',
  },
  
  // API Routes
  API: {
    CLUBS: '/api/clubs/',
    CLUB_REQUESTS: '/api/clubs/requests/',
    MEMBERSHIPS: '/api/memberships/',
    EVENTS: '/api/events/',
  }
};

// User Roles
export const USER_ROLES = {
  MEMBER: 'member',
  COORDINATOR: 'coordinator',
  STUDENT_LIFE_OFFICER: 'student_life_officer',
} as const;

// Request Status
export const REQUEST_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
} as const;

// Club Status
export const CLUB_STATUS = {
  PENDING: 'pending',
  ACTIVE: 'active',
  ARCHIVED: 'archived',
} as const;

// Event Status
export const EVENT_STATUS = {
  UPCOMING: 'upcoming',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

// Event Types
export const EVENT_TYPES = {
  PUBLIC: 'public',
  PRIVATE: 'private',
} as const;

// Membership Status
export const MEMBERSHIP_STATUS = {
  PENDING: 'pending',
  ACTIVE: 'active',
  REJECTED: 'rejected',
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
};

// Application Config
export const APP_CONFIG = {
  NAME: 'SESAVENTY',
  VERSION: '1.0.0',
  DESCRIPTION: 'Student Engagement System',
};