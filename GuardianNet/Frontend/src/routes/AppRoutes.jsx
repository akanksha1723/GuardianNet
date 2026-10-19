import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage           from '../module1/pages/LandingPage/LandingPage';
import LoginPage             from '../module1/pages/Auth/LoginPage';
import RegisterPage          from '../module1/pages/Auth/RegisterPage';
import NotFound              from '../module1/pages/NotFound';
import ProtectedRoute        from './ProtectedRoute';
import RoleRedirect          from './RoleRedirect';
import UserDashboard         from '../module2/pages/UserDashboard/UserDashboard';
import VolunteerDashboard    from '../module2/pages/VolunteerDashboard/VolunteerDashboard';
import AdminDashboard        from '../module2/pages/AdminDashboard/AdminDashboard';
import VolunteerVerification from '../module3/pages/VolunteerVerification/VolunteerVerification';
import VolunteerProfile      from '../module3/pages/VolunteerProfile/VolunteerProfile';
import NearbyRequests        from '../module3/pages/NearbyRequests/NearbyRequests';
import EmergencySOS          from '../module4/pages/EmergencySOS/EmergencySOS';
import EmergencyContacts     from '../module4/pages/EmergencyContacts/EmergencyContacts';
import EmergencyHistory      from '../module4/pages/EmergencyHistory/EmergencyHistory';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/"         element={<LandingPage />} />
      <Route path="/login"    element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/dashboard" element={
        <ProtectedRoute><RoleRedirect /></ProtectedRoute>
      } />

      <Route path="/user/dashboard" element={
        <ProtectedRoute><UserDashboard /></ProtectedRoute>
      } />
      <Route path="/volunteer/dashboard" element={
        <ProtectedRoute><VolunteerDashboard /></ProtectedRoute>
      } />
      <Route path="/admin/dashboard" element={
        <ProtectedRoute><AdminDashboard /></ProtectedRoute>
      } />

      <Route path="/volunteer/verify"   element={<ProtectedRoute><VolunteerVerification /></ProtectedRoute>} />
      <Route path="/volunteer/profile"  element={<ProtectedRoute><VolunteerProfile /></ProtectedRoute>} />
      <Route path="/volunteer/requests" element={<ProtectedRoute><NearbyRequests /></ProtectedRoute>} />

      <Route path="/emergency"          element={<ProtectedRoute><EmergencySOS /></ProtectedRoute>} />
      <Route path="/emergency/contacts" element={<ProtectedRoute><EmergencyContacts /></ProtectedRoute>} />
      <Route path="/history"            element={<ProtectedRoute><EmergencyHistory /></ProtectedRoute>} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}