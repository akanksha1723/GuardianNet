import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../module1/contexts/AuthContext';

/**
 * Wrap any route element that requires a logged-in user, e.g.:
 * <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
 * Unauthenticated visitors are redirected to /login and sent back to
 * where they came from once they log in (see LoginPage's location.state.from).
 */
export default function ProtectedRoute({ children }) {
  const { isAuthenticated, authLoading } = useAuth();
  const location = useLocation();

  // Avoid redirect flash while session restores from localStorage
  if (authLoading) return null;

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  return children;
}
