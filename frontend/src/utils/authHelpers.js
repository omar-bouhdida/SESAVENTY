/**
 * Cross-browser compatible authentication helpers
 */

/**
 * Safely store authentication data across browsers
 * @param {Object} authData - Authentication data including tokens and user info
 */
export const storeAuthData = (authData) => {
  try {
    const debug = import.meta.env.VITE_DEBUG === 'true';
    
    if (debug) {
      console.log('Attempting to store auth data:', {
        hasAccess: !!authData.access,
        hasToken: !!authData.token,
        hasRefresh: !!authData.refresh,
        hasUser: !!authData.user,
        status: authData.status,
      });
    }
    
    // Store tokens with fallbacks
    if (authData.access) {
      localStorage.setItem('access_token', authData.access);
    } else if (authData.token) {
      localStorage.setItem('access_token', authData.token);
    }
    
    if (authData.refresh) {
      localStorage.setItem('refresh_token', authData.refresh);
    }
    
    // Store user data 
    if (authData.user) {
      localStorage.setItem('user_data', JSON.stringify(authData.user));
    } else if (authData.status === 'success' && !authData.user) {
      // If registration was successful but no user data was returned,
      // create a minimal user object from available data
      const miniUser = {
        username: authData.username || '',
        email: authData.email || '',
      };
      if (debug) {
        console.log('Creating minimal user object:', miniUser);
      }
      localStorage.setItem('user_data', JSON.stringify(miniUser));
    }
    
    // For debugging
    if (debug) {
      console.log('Auth data stored successfully', {
        access: !!localStorage.getItem('access_token'),
        refresh: !!localStorage.getItem('refresh_token'),
        user: !!localStorage.getItem('user_data')
      });
    }
    
    return true;
  } catch (error) {
    console.error('Failed to store auth data', error);
    return false;
  }
};

/**
 * Clear all authentication data
 */
export const clearAuthData = () => {
  try {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_data');
    return true;
  } catch (error) {
    console.error('Failed to clear auth data', error);
    return false;
  }
};

/**
 * Get stored authentication data
 * @returns {Object} Authentication data
 */
export const getAuthData = () => {
  try {
    return {
      accessToken: localStorage.getItem('access_token'),
      refreshToken: localStorage.getItem('refresh_token'),
      user: JSON.parse(localStorage.getItem('user_data') || 'null')
    };
  } catch (error) {
    console.error('Failed to get auth data', error);
    return { accessToken: null, refreshToken: null, user: null };
  }
};
