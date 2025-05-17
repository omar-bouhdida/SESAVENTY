import { createContext } from 'react';

// Create the initial context with empty values
const AuthContext = createContext({
  user: null,
  loading: true,
  initialized: false,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  updateProfile: async () => {},
  isAuthenticated: () => false,
  hasRole: () => false,
});

export default AuthContext;
