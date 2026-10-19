import { useState, useEffect, useRef } from 'react';
import {
  createEmergency,
  getActiveEmergency,
  cancelEmergency,
  escalateEmergency,
} from '../services/emergencyService';

const ESCALATION_SECONDS = 30;

export function useEmergency() {
  const [emergency, setEmergency]           = useState(null);
  const [loading, setLoading]               = useState(false);
  const [error, setError]                   = useState('');
  const [step, setStep]                     = useState('idle');
  const [countdown, setCountdown]           = useState(ESCALATION_SECONDS);
  const [escalated, setEscalated]           = useState(false);
  const [emergencyNumbers, setEmNumbers]    = useState(null);
  const [contactsNotified, setContacts]     = useState(0);
  const countdownRef                        = useRef(null);

  useEffect(() => {
    async function checkActive() {
      try {
        const data = await getActiveEmergency();
        if (data.data) {
          setEmergency(data.data);
          setStep(data.data.status === 'accepted' ? 'accepted' : 'pending');
        }
      } catch {
        // No active emergency
      }
    }
    checkActive();
  }, []);

  useEffect(() => {
    if (step === 'pending') {
      setCountdown(ESCALATION_SECONDS);
      countdownRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownRef.current);
            handleEscalation();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(countdownRef.current);
  }, [step]);

  async function handleEscalation() {
    if (!emergency?._id) return;
    try {
      // Get user's state from browser if available
      let state = '';
      try {
        const pos = await new Promise((resolve, reject) =>
          navigator.geolocation.getCurrentPosition(resolve, reject)
        );
        // In Module 5 we do reverse geocoding — for now we send empty state
        state = '';
      } catch {
        state = '';
      }

      const data = await escalateEmergency(emergency._id, state);
      setEscalated(true);
      setStep('escalated');

      if (data.data?.emergencyNumbers) {
        setEmNumbers(data.data.emergencyNumbers);
      }
      if (data.data?.contactsNotified !== undefined) {
        setContacts(data.data.contactsNotified);
      }
    } catch {
      setEscalated(true);
      setStep('escalated');
    }
  }

  async function sendSOS({ category, longitude, latitude, description }) {
    setLoading(true);
    setError('');
    try {
      const data = await createEmergency({
        category,
        longitude,
        latitude,
        description,
        approximateArea: 'Your area',
      });
      setEmergency(data.data);
      setStep('pending');
    } catch (err) {
      setError(err?.response?.data?.message || 'Could not send SOS. Try again.');
    } finally {
      setLoading(false);
    }
  }

  async function cancel() {
    if (!emergency?._id) return;
    try {
      await cancelEmergency(emergency._id);
      clearInterval(countdownRef.current);
      setEmergency(null);
      setStep('idle');
      setEscalated(false);
      setEmNumbers(null);
      setContacts(0);
    } catch (err) {
      setError(err?.response?.data?.message || 'Could not cancel.');
    }
  }

  function reset() {
    setEmergency(null);
    setStep('idle');
    setEscalated(false);
    setError('');
    setEmNumbers(null);
    setContacts(0);
    clearInterval(countdownRef.current);
  }

  return {
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
    setStep,
    setEmergency,
  };
}

 