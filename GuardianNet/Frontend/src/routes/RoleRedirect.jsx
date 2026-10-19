import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../module1/contexts/AuthContext';

export default function RoleRedirect() {
  const { user } = useAuth();

  if (user?.role === 'admin')     return <Navigate to="/admin/dashboard"    replace />;
  if (user?.role === 'volunteer') return <Navigate to="/volunteer/dashboard" replace />;
  return                                 <Navigate to="/user/dashboard"      replace />;
}