import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

const clubService = {
  // Club management
  async getClubs() {
    const response = await api.get(API_ENDPOINTS.CLUBS.BASE);
    return response.data;
  },

  async getClubById(id) {
    const response = await api.get(`${API_ENDPOINTS.CLUBS.BASE}/${id}`);
    return response.data;
  },

  async createClubRequest(clubData) {
    const response = await api.post(API_ENDPOINTS.CLUBS.REQUESTS, clubData);
    return response.data;
  },

  async updateClub(id, clubData) {
    const response = await api.put(`${API_ENDPOINTS.CLUBS.BASE}/${id}`, clubData);
    return response.data;
  },

  async deleteClub(id) {
    await api.delete(`${API_ENDPOINTS.CLUBS.BASE}/${id}`);
  },

  async getActiveClubs() {
    const response = await api.get(`${API_ENDPOINTS.CLUBS.BASE}/active`);
    return response.data;
  },

  // Club creation requests
  async getClubRequests() {
    const response = await api.get(API_ENDPOINTS.CLUBS.REQUESTS);
    return response.data;
  },

  async approveClubRequest(requestId) {
    const response = await api.put(`${API_ENDPOINTS.CLUBS.REQUESTS}/${requestId}/approve`);
    return response.data;
  },

  async rejectClubRequest(requestId, reason) {
    const response = await api.put(`${API_ENDPOINTS.CLUBS.REQUESTS}/${requestId}/reject`, { reason });
    return response.data;
  },

  // Club membership
  async createMembershipRequest(clubId, lettreMotivation) {
    const response = await api.post(`${API_ENDPOINTS.CLUBS.ADHESIONS}/${clubId}`, {
      lettreMotivation,
    });
    return response.data;
  },

  async getMembershipRequests(clubId) {
    const response = await api.get(`${API_ENDPOINTS.CLUBS.ADHESIONS}/${clubId}`);
    return response.data;
  },

  async approveMembershipRequest(clubId, requestId) {
    const response = await api.put(`${API_ENDPOINTS.CLUBS.ADHESIONS}/${clubId}/${requestId}/approve`);
    return response.data;
  },

  async rejectMembershipRequest(clubId, requestId, reason) {
    const response = await api.put(`${API_ENDPOINTS.CLUBS.ADHESIONS}/${clubId}/${requestId}/reject`, {
      reason,
    });
    return response.data;
  },

  // Club members management
  async getClubMembers(clubId) {
    const response = await api.get(`${API_ENDPOINTS.CLUBS.MEMBERS}/${clubId}`);
    return response.data;
  },

  async updateMemberRole(clubId, memberId, role) {
    const response = await api.put(`${API_ENDPOINTS.CLUBS.MEMBERS}/${clubId}/${memberId}/role`, {
      role,
    });
    return response.data;
  },

  async updateMemberStatus(clubId, memberId, status) {
    const response = await api.put(`${API_ENDPOINTS.CLUBS.MEMBERS}/${clubId}/${memberId}/status`, {
      status,
    });
    return response.data;
  },

  async removeMember(clubId, memberId) {
    await api.delete(`${API_ENDPOINTS.CLUBS.MEMBERS}/${clubId}/${memberId}`);
  },
};

export default clubService;