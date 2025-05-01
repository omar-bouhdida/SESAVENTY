import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const withRoleBasedRoute = (WrappedComponent, allowedRoles) => {
  return () => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!user || !allowedRoles.includes(user.role)) {
      return <Navigate to="/unauthorized" state={{ from: location }} replace />;
    }

    return WrappedComponent;
  };
};