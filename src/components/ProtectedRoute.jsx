// File: src/components/ProtectedRoute.jsx
import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../store/index';

export default function ProtectedRoute() {
  const { isAuthenticated, restoreSession } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // Try to restore session from localStorage
    restoreSession();
  }, [restoreSession]);

  if (!isAuthenticated) {
    // Redirect to login, but save the location they were trying to access
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // If authenticated, render child routes
  return <Outlet />;
}