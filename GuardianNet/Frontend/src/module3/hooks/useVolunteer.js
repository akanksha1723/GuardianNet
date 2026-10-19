import { useState, useEffect } from 'react';
import {
  getMyVolunteerProfile,
  toggleMyAvailability,
  updateMyLocation,
} from '../services/volunteerService';

export function useVolunteer() {
  const [profile, setProfile]     = useState(null);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState('');

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await getMyVolunteerProfile();
        setProfile(data.data);
      } catch (err) {
        setError(err?.response?.data?.message || 'Could not load profile.');
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  async function toggleAvailability() {
    try {
      const data = await toggleMyAvailability();
      setProfile((prev) => ({ ...prev, isAvailable: data.data.isAvailable }));
    } catch (err) {
      setError(err?.response?.data?.message || 'Could not update availability.');
    }
  }

  async function updateLocation(latitude, longitude) {
    try {
      await updateMyLocation(latitude, longitude);
    } catch (err) {
      console.error('Location update failed:', err.message);
    }
  }

  return { profile, loading, error, toggleAvailability, updateLocation };
}