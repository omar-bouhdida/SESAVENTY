import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

const memberService = {
  // Get member details
  async getMemberProfile(clubId, memberId) {
    const response = await api.get(`${API_ENDPOINTS.CLUBS.MEMBERS}/${clubId}/${memberId}`);
    return response.data;
  },

  // Update member status (MEMBRE/SUSPENDU)
  async updateMemberStatus(clubId, memberId, status) {
    const response = await api.put(`${API_ENDPOINTS.CLUBS.MEMBERS}/${clubId}/${memberId}/status`, {
      status,
    });
    return response.data;
  },

  // Update member role (MEMBRE/COORDINATEUR)
  async updateMemberRole(clubId, memberId, role) {
    const response = await api.put(`${API_ENDPOINTS.CLUBS.MEMBERS}/${clubId}/${memberId}/role`, {
      role,
    });
    return response.data;
  },

  // Get all members by club
  async getClubMembers(clubId) {
    const response = await api.get(`${API_ENDPOINTS.CLUBS.MEMBERS}/${clubId}`);
    return response.data;
  },

  // Get all clubs where user is a member
  async getUserClubs() {
    const response = await api.get(`${API_ENDPOINTS.USERS.PROFILE}/clubs`);
    return response.data;
  },

  // Leave a club
  async leaveClub(clubId) {
    await api.delete(`${API_ENDPOINTS.CLUBS.MEMBERS}/${clubId}/leave`);
  },
};

export default memberService;