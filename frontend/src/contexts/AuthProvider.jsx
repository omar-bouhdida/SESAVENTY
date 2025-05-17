import React, { useState, useEffect, useContext } from 'react';
import AuthContext from './AuthContext';
import authService from '../services/authService';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  // Initialize auth state from local storage on page load
  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);
      
      try {
        if (authService.isAuthenticated()) {
          // Get the user from local storage first
          const storedUser = authService.getUser();
          if (storedUser) {
            setUser(storedUser);
          }
          
          // Then try to refresh user data from server
          try {
            const userData = await authService.fetchUserData();
            setUser(userData);
          } catch (error) {
            console.warn('Could not fetch fresh user data', error);
            // We'll continue with the stored data
          }
        }
      } catch (error) {
        console.error('Error initializing auth state:', error);
        // If there's an error, we'll clear the auth state
        authService.logout();
        setUser(null);
      } finally {
        setLoading(false);
        setInitialized(true);
      }
    };
    
    initializeAuth();
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const response = await authService.login(credentials);
      setUser(authService.getUser());
      return response;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData, role) => {
    setLoading(true);
    try {
      const response = await authService.register(userData, role);
      setUser(authService.getUser());
      return response;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authService.logout();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (userData) => {
    setLoading(true);
    try {
      const updatedUser = await authService.updateProfile(userData);
      setUser(updatedUser);
      return updatedUser;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    initialized,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: authService.isAuthenticated,
    hasRole: authService.hasRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
