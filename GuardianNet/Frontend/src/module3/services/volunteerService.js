import api from '../../module1/services/api';

export async function applyAsVolunteer(payload) {
  const { data } = await api.post('/volunteers/apply', payload);
  return data;
}

export async function getMyVolunteerProfile() {
  const { data } = await api.get('/volunteers/profile');
  return data;
}

export async function updateMyVolunteerProfile(payload) {
  const { data } = await api.put('/volunteers/profile', payload);
  return data;
}

export async function getNearbyVolunteers(latitude, longitude, maxDistance = 5000) {
  const { data } = await api.get('/volunteers/nearby', {
    params: { latitude, longitude, maxDistance },
  });
  return data;
}

export async function updateMyLocation(latitude, longitude) {
  const { data } = await api.put('/volunteers/location', { latitude, longitude });
  return data;
}

export async function toggleMyAvailability() {
  const { data } = await api.put('/volunteers/availability');
  return data;
}

export async function getPendingVerifications() {
  const { data } = await api.get('/volunteers/admin/pending');
  return data;
}

export async function verifyVolunteer(id, status, note = '') {
  const { data } = await api.put(`/volunteers/admin/${id}/verify`, { status, note });
  return data;
}