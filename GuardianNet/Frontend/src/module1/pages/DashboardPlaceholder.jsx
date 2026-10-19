import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function DashboardPlaceholder() {
  const { user, logout } = useAuth();

  return (
    <div
      style={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '40px 24px',
      }}
    >
      <h1 style={{ marginBottom: '12px' }}>
        Welcome, {user?.name || 'Guardian'} 👋
      </h1>
      <p style={{ maxWidth: 420, marginBottom: '24px' }}>
        You're logged in. The real{' '}
        {user?.role === 'volunteer' ? 'Volunteer' : 'User'} Dashboard — with
        live stats, the SOS flow, maps, and notifications — is built in
        Module 2 onward.
      </p>
      <button type="button" className="gn-btn gn-btn-ghost" onClick={logout}>
        Log Out
      </button>
    </div>
  );
}