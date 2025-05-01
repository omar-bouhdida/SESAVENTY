import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

export const getClubCreationRequests = async () => {
  const response = await api.get(API_ENDPOINTS.CLUBS.REQUESTS);
  return response.data;
};

export const getClubCreationRequestById = async (requestId) => {
  const response = await api.get(`${API_ENDPOINTS.CLUBS.REQUESTS}/${requestId}`);
  return response.data;
};

export const approveClubCreationRequest = async (requestId) => {
  const response = await api.put(`${API_ENDPOINTS.CLUBS.REQUESTS}/${requestId}/approve`);
  return response.data;
};

export const rejectClubCreationRequest = async (requestId, reason) => {
  const response = await api.put(
    `${API_ENDPOINTS.CLUBS.REQUESTS}/${requestId}/reject`,
    { reason }
  );
  return response.data;
};

// Combine all functions into a default export
export default {
  getClubCreationRequests,
  getClubCreationRequestById,
  approveClubCreationRequest,
  rejectClubCreationRequest,
};