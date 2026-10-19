import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

export default function NotFound() {
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
      <h1 style={{ fontSize: '3.5rem', marginBottom: '8px' }}>404</h1>
      <p style={{ marginBottom: '24px', maxWidth: 380 }}>
        This page doesn't exist, or hasn't been built yet — some areas of
        GuardianNet are still under construction in later modules.
      </p>
      <Link to="/" className="gn-btn gn-btn-primary">
        <FiArrowLeft /> Back to Home
      </Link>
    </div>
  );
}