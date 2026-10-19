import api from '../../module1/services/api';

export async function createEmergency(payload) {
  const { data } = await api.post('/emergency/sos', payload);
  return data;
}

export async function getActiveEmergency() {
  const { data } = await api.get('/emergency/active');
  return data;
}

export async function cancelEmergency(id) {
  const { data } = await api.put(`/emergency/${id}/cancel`);
  return data;
}

export async function escalateEmergency(id, state = '') {
  const { data } = await api.put(`/emergency/${id}/escalate`, { state });
  return data;
}

export async function acceptEmergency(id) {
  const { data } = await api.put(`/emergency/${id}/accept`);
  return data;
}

export async function completeEmergency(id) {
  const { data } = await api.put(`/emergency/${id}/complete`);
  return data;
}

export async function rateEmergency(id, rating, review) {
  const { data } = await api.put(`/emergency/${id}/rate`, { rating, review });
  return data;
}

export async function getEmergencyHistory() {
  const { data } = await api.get('/emergency/history');
  return data;
}

export async function getEmergencyContacts() {
  const { data } = await api.get('/emergency/contacts');
  return data;
}

export async function saveEmergencyContacts(contacts) {
  const { data } = await api.post('/emergency/contacts', { contacts });
  return data;
}

