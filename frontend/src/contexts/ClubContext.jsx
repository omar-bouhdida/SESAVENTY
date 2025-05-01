import React, { createContext, useContext, useState, useCallback } from 'react';
import clubService from '../services/clubService';

export const ClubContext = createContext(null);

export const ClubProvider = ({ children }) => {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchClubs = useCallback(async () => {
    try {
      setLoading(true);
      const data = await clubService.getClubs();
      setClubs(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const getClubById = useCallback(async (id) => {
    try {
      setLoading(true);
      const data = await clubService.getClubById(id);
      setError(null);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createClub = useCallback(async (clubData) => {
    try {
      setLoading(true);
      const data = await clubService.createClub(clubData);
      setClubs(prev => [...prev, data]);
      setError(null);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateClub = useCallback(async (id, clubData) => {
    try {
      setLoading(true);
      const data = await clubService.updateClub(id, clubData);
      setClubs(prev => prev.map(club => club.id === id ? data : club));
      setError(null);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteClub = useCallback(async (id) => {
    try {
      setLoading(true);
      await clubService.deleteClub(id);
      setClubs(prev => prev.filter(club => club.id !== id));
      setError(null);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    clubs,
    loading,
    error,
    fetchClubs,
    getClubById,
    createClub,
    updateClub,
    deleteClub,
  };

  return (
    <ClubContext.Provider value={value}>
      {children}
    </ClubContext.Provider>
  );
};

export const useClub = () => {
  const context = useContext(ClubContext);
  if (!context) {
    throw new Error('useClub must be used within a ClubProvider');
  }
  return context;
};