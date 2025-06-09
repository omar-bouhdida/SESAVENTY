import api from './api';
import { API_ENDPOINTS } from '../utils/constants';
import { Membership, PaginatedResponse } from '../types';

class MembershipService {
  // Get all memberships
  async getMemberships(): Promise<PaginatedResponse<Membership>> {
    try {
      const response = await api.get(API_ENDPOINTS.API.MEMBERSHIPS);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch memberships');
    }
  }

  // Get membership by ID
  async getMembership(id: number): Promise<Membership> {
    try {
      const response = await api.get(`${API_ENDPOINTS.API.MEMBERSHIPS}${id}/`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch membership');
    }
  }

  // Join club (create membership)
  async joinClub(clubId: number): Promise<Membership> {
    try {
      const response = await api.post(API_ENDPOINTS.API.MEMBERSHIPS, { club: clubId });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to join club');
    }
  }

  // Leave club (delete membership)
  async leaveClub(membershipId: number): Promise<void> {
    try {
      await api.delete(`${API_ENDPOINTS.API.MEMBERSHIPS}${membershipId}/`);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to leave club');
    }
  }

  // Update membership status (for coordinators/admins)
  async updateMembershipStatus(id: number, status: string): Promise<Membership> {
    try {
      const response = await api.patch(`${API_ENDPOINTS.API.MEMBERSHIPS}${id}/`, { status });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update membership status');
    }
  }

  // Get memberships by club
  async getMembershipsByClub(clubId: number): Promise<PaginatedResponse<Membership>> {
    try {
      const response = await api.get(`${API_ENDPOINTS.API.MEMBERSHIPS}?club=${clubId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch club memberships');
    }
  }

  // Get user's memberships
  async getUserMemberships(): Promise<PaginatedResponse<Membership>> {
    try {
      const response = await api.get(`${API_ENDPOINTS.API.MEMBERSHIPS}?user=me`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch user memberships');
    }
  }
}

const membershipService = new MembershipService();
export default membershipService;
