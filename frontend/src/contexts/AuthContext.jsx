// src/contexts/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check auth state when app loads
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('currentUser');
      }
    }
    setLoading(false);
  }, []);

  const login = async (userData) => {
    // In a real app, you would make an API call here
    const user = {
      ...userData,
      role: userData.role || 'ClubMember' // Default role
    };
    localStorage.setItem('currentUser', JSON.stringify(user));
    setCurrentUser(user);
    
    // Redirect based on role
    switch(user.role) {
      case 'CommunityManager':
        navigate('/admin');
        break;
      case 'ClubCoordinator':
        navigate('/coordinator');
        break;
      default:
        navigate('/member');
    }
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    navigate('/login');
  };

  const value = {
    currentUser,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);