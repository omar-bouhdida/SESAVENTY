import api from './api';
import { API_ENDPOINTS } from '../utils/constants';
import { Event, EventForm, PaginatedResponse } from '../types';

class EventService {
  // Get all events
  async getEvents(): Promise<PaginatedResponse<Event>> {
    try {
      const response = await api.get(API_ENDPOINTS.API.EVENTS);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch events');
    }
  }

  // Get event by ID
  async getEvent(id: number): Promise<Event> {
    try {
      const response = await api.get(`${API_ENDPOINTS.API.EVENTS}${id}/`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch event');
    }
  }

  // Create event
  async createEvent(data: EventForm): Promise<Event> {
    try {
      const response = await api.post(API_ENDPOINTS.API.EVENTS, data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to create event');
    }
  }

  // Update event
  async updateEvent(id: number, data: Partial<EventForm>): Promise<Event> {
    try {
      const response = await api.patch(`${API_ENDPOINTS.API.EVENTS}${id}/`, data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update event');
    }
  }

  // Delete event
  async deleteEvent(id: number): Promise<void> {
    try {
      await api.delete(`${API_ENDPOINTS.API.EVENTS}${id}/`);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to delete event');
    }
  }

  // Register for event
  async registerForEvent(id: number): Promise<void> {
    try {
      await api.post(`${API_ENDPOINTS.API.EVENTS}${id}/register/`);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to register for event');
    }
  }

  // Unregister from event
  async unregisterFromEvent(id: number): Promise<void> {
    try {
      await api.delete(`${API_ENDPOINTS.API.EVENTS}${id}/unregister/`);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to unregister from event');
    }
  }

  // Get events by club
  async getEventsByClub(clubId: number): Promise<PaginatedResponse<Event>> {
    try {
      const response = await api.get(`${API_ENDPOINTS.API.EVENTS}?club=${clubId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch club events');
    }
  }
}

const eventService = new EventService();
export default eventService;