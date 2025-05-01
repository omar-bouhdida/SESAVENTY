import React, { createContext, useContext, useState, useCallback } from 'react';
import eventService from '../services/eventService';

export const EventContext = createContext(null);

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEvents = useCallback(async (clubId) => {
    try {
      setLoading(true);
      const data = await eventService.getEvents(clubId);
      setEvents(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const getEventById = useCallback(async (id) => {
    try {
      setLoading(true);
      const data = await eventService.getEventById(id);
      setError(null);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createEvent = useCallback(async (eventData) => {
    try {
      setLoading(true);
      const data = await eventService.createEvent(eventData);
      setEvents(prev => [...prev, data]);
      setError(null);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateEvent = useCallback(async (id, eventData) => {
    try {
      setLoading(true);
      const data = await eventService.updateEvent(id, eventData);
      setEvents(prev => prev.map(event => event.id === id ? data : event));
      setError(null);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteEvent = useCallback(async (id) => {
    try {
      setLoading(true);
      await eventService.deleteEvent(id);
      setEvents(prev => prev.filter(event => event.id !== id));
      setError(null);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const registerForEvent = useCallback(async (eventId) => {
    try {
      setLoading(true);
      const data = await eventService.registerForEvent(eventId);
      setEvents(prev => 
        prev.map(event => 
          event.id === eventId 
            ? { ...event, participants: [...event.participants, data] }
            : event
        )
      );
      setError(null);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    events,
    loading,
    error,
    fetchEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
    registerForEvent,
  };

  return (
    <EventContext.Provider value={value}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvent = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvent must be used within an EventProvider');
  }
  return context;
};