import { useState, useEffect } from 'react';
import {
  getUserStats,
  getVolunteerStats,
  getAdminStats,
  getRecentActivity,
} from '../services/dashboardService';

export function useDashboard(role) {
  const [stats, setStats]               = useState(null);
  const [recentActivity, setRecent]     = useState([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        // Fetch role-specific stats
        let statsData;
        if (role === 'admin') {
          statsData = await getAdminStats();
        } else if (role === 'volunteer') {
          statsData = await getVolunteerStats();
        } else {
          statsData = await getUserStats();
        }

        setStats(statsData.data);

        // Fetch recent activity
        const activityData = await getRecentActivity();
        setRecent(activityData.data || []);
      } catch (err) {
        // If backend not ready yet, use placeholder data
        setStats(null);
        setRecent([]);
        setError(err?.response?.data?.message || '');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [role]);

  return { stats, recentActivity, loading, error };
}