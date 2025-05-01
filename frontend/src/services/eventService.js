import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

const eventService = {
  async getEvents(clubId) {
    const url = clubId 
      ? `${API_ENDPOINTS.CLUBS.BASE}/${clubId}/evenements`
      : API_ENDPOINTS.EVENTS.BASE;
    const response = await api.get(url);
    return response.data;
  },

  async getEventById(id) {
    const response = await api.get(`${API_ENDPOINTS.EVENTS.BASE}/${id}`);
    return response.data;
  },

  async createEvent(eventData) {
    const response = await api.post(API_ENDPOINTS.EVENTS.BASE, eventData);
    return response.data;
  },

  async updateEvent(id, eventData) {
    const response = await api.put(`${API_ENDPOINTS.EVENTS.BASE}/${id}`, eventData);
    return response.data;
  },

  async deleteEvent(id) {
    await api.delete(`${API_ENDPOINTS.EVENTS.BASE}/${id}`);
  },

  async getPublicEvents() {
    const response = await api.get(`${API_ENDPOINTS.EVENTS.BASE}/public`);
    return response.data;
  },

  async getClubEvents(clubId) {
    const response = await api.get(`${API_ENDPOINTS.CLUBS.BASE}/${clubId}/evenements`);
    return response.data;
  },

  async toggleEventVisibility(eventId) {
    const response = await api.put(`${API_ENDPOINTS.EVENTS.BASE}/${eventId}/visibility`);
    return response.data;
  }
};

export default eventService;