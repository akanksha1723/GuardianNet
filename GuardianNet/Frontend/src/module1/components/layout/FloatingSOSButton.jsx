import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiAlertTriangle } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import './FloatingSOSButton.css';

/**
 * Signature UI element of GuardianNet. The expanding sonar rings are a
 * visual metaphor for the volunteer network "listening" at all times —
 * the instant someone presses it, that listening becomes a real alert.
 * Full SOS flow (category selection, GPS, matching) is built in the
 * Emergency SOS module; for now this routes to login/dashboard.
 */
export default function FloatingSOSButton() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  function handlePress() {
    navigate(isAuthenticated ? '/dashboard' : '/login');
  }

  return (
    <button
      type="button"
      className="gn-sos-fab"
      onClick={handlePress}
      aria-label="Open Emergency SOS"
      title="Emergency SOS"
    >
      <span className="gn-sos-ring gn-sos-ring-1" aria-hidden="true" />
      <span className="gn-sos-ring gn-sos-ring-2" aria-hidden="true" />
      <span className="gn-sos-core">
        <FiAlertTriangle />
        <span className="gn-sos-label">SOS</span>
      </span>
    </button>
  );
}
