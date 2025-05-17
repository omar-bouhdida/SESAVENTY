import axios from 'axios';

// Create Axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Response interceptor for handling common errors
api.interceptors.response.use(
  response => response,
  error => {
    // Handle session expiration
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      // Redirect to login page if not already there
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth service functions
const authService = {
  login: async (username, password) => {
    const response = await api.post('/auth/login/', { username, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },
  
  logout: () => {
    localStorage.removeItem('token');
  },
  
  register: async (userData, role) => {
    let endpoint = '/auth/register/member/';
    
    if (role === 'coordinator') {
      endpoint = '/auth/register/coordinator/';
    } else if (role === 'student_life_officer') {
      endpoint = '/auth/register/rva/';
    }
    
    return api.post(endpoint, userData);
  },
  
  getCurrentUser: async () => {
    return api.get('/auth/me/');
  }
};

// Clubs service
const clubsService = {
  getAll: () => api.get('/api/clubs/'),
  
  getById: (id) => api.get(`/api/clubs/${id}/`),
  
  create: (clubData) => api.post('/api/clubs/requests/', clubData),
  
  getMembers: (clubId) => api.get(`/api/clubs/${clubId}/members/`),
  
  getEvents: (clubId) => api.get(`/api/clubs/${clubId}/events/`),
  
  getCoordinator: (clubId) => api.get(`/api/clubs/${clubId}/coordinator/`)
};

// Events service
const eventsService = {
  getAll: () => api.get('/api/events/'),
  
  getById: (id) => api.get(`/api/events/${id}/`),
  
  create: (eventData) => api.post('/api/events/', eventData),
  
  update: (id, eventData) => api.patch(`/api/events/${id}/`, eventData),
  
  getByClub: (clubId) => api.get(`/api/events/by-club/${clubId}/`)
};

// Memberships service
const membershipsService = {
  getAll: () => api.get('/api/memberships/'),
  
  getById: (id) => api.get(`/api/memberships/${id}/`),
  
  create: (membershipData) => api.post('/api/memberships/', membershipData),
  
  update: (id, membershipData) => api.patch(`/api/memberships/${id}/`, membershipData),
  
  getUserMemberships: (userId) => api.get(`/api/memberships/?user=${userId}`)
};

// Users service
const usersService = {
  getCoordinators: () => api.get('/users/coordinators/'),
  
  getMembers: () => api.get('/users/members/'),
  
  getRVAs: () => api.get('/users/rvas/'),
  
  updateUser: (id, userData) => api.patch(`/users/${id}/`, userData)
};

// Export all services
export {
  api as default,
  authService,
  clubsService,
  eventsService,
  membershipsService,
  usersService
};
