import { useContext } from 'react';
import { ClubContext } from '../contexts/ClubContext';

/**
 * Custom hook to access club context
 * @returns {Object} Club context containing clubs data, loading state, and club management methods
 */
export const useClub = () => {
  const context = useContext(ClubContext);
  if (!context) {
    throw new Error('useClub must be used within a ClubProvider');
  }
  return context;
};