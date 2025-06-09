import api from './api';
import { API_ENDPOINTS, STORAGE_KEYS } from '../utils/constants';
import { AuthResponse, LoginCredentials, RegisterData, User } from '../types';

class AuthService {
  // Login user
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
      const { token, user } = response.data;
      
      // Store auth data
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
      localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user));
      
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  }

  // Register user based on role
  async register(data: RegisterData, role: string): Promise<AuthResponse> {
    try {
      let endpoint: string;
      switch (role) {
        case 'member':
          endpoint = API_ENDPOINTS.AUTH.REGISTER_MEMBER;
          break;
        case 'coordinator':
          endpoint = API_ENDPOINTS.AUTH.REGISTER_COORDINATOR;
          break;
        case 'student_life_officer':
          endpoint = API_ENDPOINTS.AUTH.REGISTER_RVA;
          break;
        default:
          endpoint = API_ENDPOINTS.AUTH.REGISTER_MEMBER;
      }

      const response = await api.post(endpoint, data);
      const { token, user } = response.data;
      
      // Store auth data
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
      localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user));
      
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  }

  // Get current user
  async getCurrentUser(): Promise<User> {
    try {
      const response = await api.get(API_ENDPOINTS.AUTH.ME);
      const user = response.data;
      
      // Update stored user data
      localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user));
      
      return user;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to get user data');
    }
  }

  // Logout user
  logout(): void {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  }

  // Get stored user data
  getStoredUser(): User | null {
    const userData = localStorage.getItem(STORAGE_KEYS.USER_DATA);
    return userData ? JSON.parse(userData) : null;
  }

  // Get stored token
  getStoredToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  }
}

const authService = new AuthService();
export default authService;