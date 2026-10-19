import api from '../../module1/services/api';

// Fetch stats for the logged-in user dashboard
export async function getUserStats() {
  const { data } = await api.get('/dashboard/user/stats');
  return data;
}

// Fetch stats for the volunteer dashboard
export async function getVolunteerStats() {
  const { data } = await api.get('/dashboard/volunteer/stats');
  return data;
}

// Fetch stats for the admin dashboard
export async function getAdminStats() {
  const { data } = await api.get('/dashboard/admin/stats');
  return data;
}

// Fetch recent activity for any role
export async function getRecentActivity() {
  const { data } = await api.get('/dashboard/recent-activity');
  return data;
}