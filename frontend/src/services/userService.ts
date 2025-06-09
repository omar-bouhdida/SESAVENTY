import api from './api';
import { API_ENDPOINTS } from '../utils/constants';
import { User, PaginatedResponse } from '../types';

class UserService {
  // Get coordinators list
  async getCoordinators(): Promise<PaginatedResponse<User>> {
    try {
      const response = await api.get(API_ENDPOINTS.USERS.COORDINATORS);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch coordinators');
    }
  }

  // Get members list
  async getMembers(): Promise<PaginatedResponse<User>> {
    try {
      const response = await api.get(API_ENDPOINTS.USERS.MEMBERS);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch members');
    }
  }

  // Get RVAs/Student Life Officers list
  async getRVAs(): Promise<PaginatedResponse<User>> {
    try {
      const response = await api.get(API_ENDPOINTS.USERS.RVAS);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch RVAs');
    }
  }

  // Update user profile
  async updateProfile(data: Partial<User>): Promise<User> {
    try {
      const response = await api.patch(API_ENDPOINTS.AUTH.ME, data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update profile');
    }
  }
}

const userService = new UserService();
export default userService;