import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

const authService = {
  async login(credentials) {
    const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  async register(userData) {
    const response = await api.post(API_ENDPOINTS.AUTH.REGISTER, userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  async logout() {
    try {
      await api.post(API_ENDPOINTS.AUTH.LOGOUT);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },

  async updateProfile(userData) {
    const response = await api.put(API_ENDPOINTS.USERS.PROFILE, userData);
    localStorage.setItem('user', JSON.stringify(response.data));
    return response.data;
  },

  async updatePassword(passwordData) {
    await api.put(`${API_ENDPOINTS.USERS.PROFILE}/password`, passwordData);
  },

  getToken() {
    return localStorage.getItem('token');
  },

  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated() {
    return !!this.getToken();
  },

  hasRole(role) {
    const user = this.getUser();
    return user?.role === role;
  },
};

export default authService;