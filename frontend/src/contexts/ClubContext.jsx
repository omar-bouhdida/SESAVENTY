// src/contexts/ClubContext.jsx
import { createContext, useContext, useState } from 'react';

// 1. Create the context
const ClubContext = createContext();

// 2. Create the provider component
export function ClubsProvider({ children }) {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Add any club-related functions you need
  const addClub = (newClub) => {
    setClubs([...clubs, newClub]);
  };

  const value = {
    clubs,
    loading,
    addClub,
    fetchClubs,
    setClubs
  };

  return (
    <ClubContext.Provider value={value}>
      {children}
    </ClubContext.Provider>
  );
}
const fetchClubs = async () => {
  setLoading(true);
  try {
    // Replace with actual API call
    const response = await fetch('/api/clubs');
    const data = await response.json();
    setClubs(data);
  } catch (error) {
    console.error('Failed to fetch clubs:', error);
  } finally {
    setLoading(false);
  }
};

// 3. Create the custom hook
export function useClubs() {
  const context = useContext(ClubContext);
  if (context === undefined) {
    throw new Error('useClubs must be used within a ClubsProvider');
  }
  return context;
}