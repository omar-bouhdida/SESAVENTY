import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('token');
      if (token) {
        // Set token in API headers
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        // Fetch current user
        fetchCurrentUser();
      } else {
        setLoading(false);
      }
    };
    
    checkToken();
  }, []);  // We're intentionally not adding fetchCurrentUser as a dependency to avoid a loop

  const fetchCurrentUser = async () => {
    try {
      const response = await api.get('/auth/me/');
      setCurrentUser(response.data);
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch user:', error);
      logout();
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    try {
      setError(null);
      const response = await api.post('/auth/login/', { username, password });
      const { token, ...userData } = response.data;
      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setCurrentUser(userData);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      setError(error.response?.data?.detail || 'Login failed. Please try again.');
      return false;
    }
  };

  const register = async (userData, role) => {
    try {
      setError(null);
      let endpoint = '/auth/register/member/';
      
      if (role === 'coordinator') {
        endpoint = '/auth/register/coordinator/';
      } else if (role === 'student_life_officer') {
        endpoint = '/auth/register/rva/';
      }
      
      await api.post(endpoint, userData);
      return true;
    } catch (error) {
      setError(error.response?.data?.detail || 'Registration failed. Please try again.');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    currentUser,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
