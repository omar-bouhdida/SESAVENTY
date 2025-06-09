import api from './api';
import { API_ENDPOINTS } from '../utils/constants';
import { Club, ClubCreationRequest, ClubForm, PaginatedResponse } from '../types';

class ClubService {
  // Get all clubs
  async getClubs(): Promise<PaginatedResponse<Club>> {
    try {
      const response = await api.get(API_ENDPOINTS.API.CLUBS);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch clubs');
    }
  }

  // Get club by ID
  async getClub(id: number): Promise<Club> {
    try {
      const response = await api.get(`${API_ENDPOINTS.API.CLUBS}${id}/`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch club');
    }
  }

  // Create club
  async createClub(data: ClubForm): Promise<Club> {
    try {
      const response = await api.post(API_ENDPOINTS.API.CLUBS, data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to create club');
    }
  }

  // Update club
  async updateClub(id: number, data: Partial<ClubForm>): Promise<Club> {
    try {
      const response = await api.patch(`${API_ENDPOINTS.API.CLUBS}${id}/`, data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update club');
    }
  }

  // Delete club
  async deleteClub(id: number): Promise<void> {
    try {
      await api.delete(`${API_ENDPOINTS.API.CLUBS}${id}/`);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to delete club');
    }
  }

  // Get club creation requests
  async getClubRequests(): Promise<PaginatedResponse<ClubCreationRequest>> {
    try {
      const response = await api.get(API_ENDPOINTS.API.CLUB_REQUESTS);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch club requests');
    }
  }

  // Create club creation request
  async createClubRequest(data: ClubForm): Promise<ClubCreationRequest> {
    try {
      const response = await api.post(API_ENDPOINTS.API.CLUB_REQUESTS, data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to create club request');
    }
  }

  // Approve club request
  async approveClubRequest(id: number): Promise<ClubCreationRequest> {
    try {
      const response = await api.patch(`${API_ENDPOINTS.API.CLUB_REQUESTS}${id}/approve/`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to approve club request');
    }
  }

  // Reject club request
  async rejectClubRequest(id: number): Promise<ClubCreationRequest> {
    try {
      const response = await api.patch(`${API_ENDPOINTS.API.CLUB_REQUESTS}${id}/reject/`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to reject club request');
    }
  }
}

const clubService = new ClubService();
export default clubService;