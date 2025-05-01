import { useContext } from 'react';
import { EventContext } from '../contexts/EventContext';

/**
 * Custom hook to access event context
 * @returns {Object} Event context containing events data, loading state, and event management methods
 */
export const useEvent = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvent must be used within an EventProvider');
  }
  return context;
};