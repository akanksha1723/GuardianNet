import React, { useState, useEffect } from 'react';
import { FiMapPin, FiAlertTriangle, FiX, FiCheckCircle } from 'react-icons/fi';

import DashboardLayout from '../../../module2/components/DashboardLayout';
import SOSButton from '../../components/SOSButton';
import CategorySelector from '../../components/CategorySelector';
import EscalationTimer from '../../components/EscalationTimer';
import FakeCall from '../../components/FakeCall';

import { useEmergency } from '../../hooks/useEmergency';
import { useShakeDetector } from '../../hooks/useShakeDetector';
import { useFakeCall } from '../../hooks/useFakeCall';
import { useOfflineSOS } from '../../hooks/useOfflineSOS';

import './EmergencySOS.css';

export default function EmergencySOS() {

  // -----------------------------
  // STATE
  // -----------------------------
  const [category, setCategory] = useState('general');
  const [location, setLocation] = useState(null);
  const [locError, setLocError] = useState('');
  const [shakeEnabled, setShake] = useState(true);
  const [online, setOnline] = useState(navigator.onLine);

  // -----------------------------
  // OFFLINE SOS
  // -----------------------------
  const { sendOfflineSOS } = useOfflineSOS();

  // -----------------------------
  // EMERGENCY HOOK
  // -----------------------------
  const {
    emergency,
    loading,
    error,
    step,
    countdown,
    escalated,
    emergencyNumbers,
    contactsNotified,
    sendSOS,
    cancel,
    reset,
  } = useEmergency();

  // -----------------------------
  // FAKE CALL HOOK
  // -----------------------------
  const {
    isRinging,
    isOnCall,
    caller,
    callDuration,
    triggerFakeCall,
    answerCall,
    endCall,
  } = useFakeCall();

  // -----------------------------
  // ONLINE / OFFLINE DETECTION
  // -----------------------------
  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // -----------------------------
  // GET GPS LOCATION
  // -----------------------------
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocError('GPS is not supported on this device.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      },
      () => {
        setLocError(
          'Could not get your location. Please allow location access.'
        );
      }
    );
  }, []);

  // -----------------------------
  // OFFLINE SOS FUNCTION
  // -----------------------------
  function handleOfflineSOS() {
    try {
      // Get saved emergency contacts
      const saved = localStorage.getItem('gn_emergency_contacts');

      const contacts = saved ? JSON.parse(saved) : [];

      const numbers = contacts
        .map((contact) => contact.phone)
        .filter(Boolean);

      // If no contacts are saved, use 112
      if (numbers.length === 0) {
        numbers.push('112');
      }

      sendOfflineSOS(numbers, category, location);

    } catch (err) {
      console.error('Offline SOS error:', err);

      // Final fallback
      window.location.href = 'sms:112';
    }
  }

  // -----------------------------
  // NORMAL SOS FUNCTION
  // -----------------------------
  async function handleSOS() {

    // If device is offline
    if (!online) {
      handleOfflineSOS();
      return;
    }

    // GPS not available
    if (!location) {
      setLocError('Waiting for GPS location…');
      return;
    }

    await sendSOS({
      category,
      longitude: location.longitude,
      latitude: location.latitude,
      description: '',
    });
  }

  // -----------------------------
  // SHAKE TO SOS
  // -----------------------------
  useShakeDetector({
    enabled: shakeEnabled && step === 'idle',

    threshold: 25,

    onShake: () => {
      if (location && step === 'idle') {
        handleSOS();
      }
    },
  });

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <DashboardLayout>

      <div className="gn-sos-page">

        {/* Fake call overlay */}
        <FakeCall
          isRinging={isRinging}
          isOnCall={isOnCall}
          caller={caller}
          callDuration={callDuration}
          onAnswer={answerCall}
          onEnd={endCall}
          onTrigger={triggerFakeCall}
        />

        {/* Header */}
        <div className="gn-sos-header">

          <h1>Emergency SOS</h1>

          <p>
            Press and hold the SOS button for 3 seconds to send an alert.
          </p>

          <div className="gn-sos-header-actions">

            {/* GPS Status */}
            <div
              className={`gn-loc-status ${
                location ? 'is-ok' : 'is-waiting'
              }`}
            >
              <FiMapPin />

              {location
                ? 'GPS Ready'
                : locError || 'Getting location…'}
            </div>

            {/* Online Status */}
            <div
              className={`gn-loc-status ${
                online ? 'is-ok' : 'is-waiting'
              }`}
            >
              {online ? 'Online' : 'Offline'}
            </div>

            {/* Shake Toggle */}
            <label className="gn-shake-toggle">

              <input
                type="checkbox"
                checked={shakeEnabled}
                onChange={(e) => setShake(e.target.checked)}
              />

              Shake to SOS

            </label>

            {/* Fake Call */}
            <FakeCall
              isRinging={false}
              isOnCall={false}
              onTrigger={triggerFakeCall}
            />

          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="gn-auth-alert">
            <FiAlertTriangle />
            {error}
          </div>
        )}

        {/* Offline warning */}
        {!online && (
          <div className="gn-auth-alert">
            <FiAlertTriangle />
            You are offline. SOS will use your saved emergency contacts.
          </div>
        )}

        {/* -------------------------------- */}
        {/* IDLE */}
        {/* -------------------------------- */}

        {step === 'idle' && (
          <>

            <CategorySelector
              selected={category}
              onSelect={setCategory}
            />

            <div className="gn-sos-btn-container">

              <SOSButton
                onPress={handleSOS}
                disabled={!location || loading}
              />

            </div>

          </>
        )}

        {/* -------------------------------- */}
        {/* PENDING / ESCALATED */}
        {/* -------------------------------- */}

        {(step === 'pending' || step === 'escalated') && (

          <div className="gn-sos-pending">

            <div className="gn-sos-pending-card gn-card">

              <div className="gn-sos-category-badge">

                <FiAlertTriangle />

                {emergency?.category
                  ?.replace(/_/g, ' ')
                  .toUpperCase()}

              </div>

              <h2>Help is on the way</h2>

              <p>
                Nearby verified volunteers have been notified.
                Your exact location is hidden until someone accepts.
              </p>

              <EscalationTimer
                countdown={countdown}
                escalated={escalated}
                emergencyNumbers={emergencyNumbers}
                contactsNotified={contactsNotified}
              />

              <button
                type="button"
                className="gn-btn gn-btn-ghost gn-sos-cancel-btn"
                onClick={cancel}
              >
                <FiX />
                Cancel Request
              </button>

            </div>

          </div>

        )}

        {/* -------------------------------- */}
        {/* ACCEPTED */}
        {/* -------------------------------- */}

        {step === 'accepted' && (

          <div className="gn-sos-accepted">

            <div className="gn-card gn-sos-accepted-card">

              <FiCheckCircle className="gn-sos-accepted-icon" />

              <h2>Volunteer Accepted!</h2>

              <p>
                A verified volunteer is on their way to you.
                Live tracking and chat will be available in the next update.
              </p>

              {emergency?.volunteer && (

                <div className="gn-sos-volunteer-info">

                  <div className="gn-sos-vol-avatar">
                    {emergency.volunteer.name?.charAt(0)}
                  </div>

                  <div>

                    <strong>
                      {emergency.volunteer.name}
                    </strong>

                    <span>
                      {emergency.volunteer.phone}
                    </span>

                  </div>

                </div>

              )}

              <button
                type="button"
                className="gn-btn gn-btn-ghost"
                onClick={reset}
              >
                Back to Dashboard
              </button>

            </div>

          </div>

        )}

      </div>

    </DashboardLayout>
  );
}