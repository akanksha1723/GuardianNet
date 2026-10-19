import React from 'react';
import {
  FiUsers, FiShield, FiAlertTriangle,
  FiBarChart2, FiCheckCircle, FiSettings,
  FiUserCheck, FiFlag,
} from 'react-icons/fi';
import DashboardLayout from '../../components/DashboardLayout';
import StatCard from '../../components/StatCard';
import QuickActions from '../../components/QuickActions';
import RecentActivity from '../../components/RecentActivity';
import { useDashboard } from '../../hooks/useDashboard';
import './AdminDashboard.css';

const QUICK_ACTIONS = [
  { label: 'Manage Users',      icon: <FiUsers />,       path: '/admin/users',      primary: true },
  { label: 'Verify Volunteers', icon: <FiUserCheck />,   path: '/admin/volunteers' },
  { label: 'View Reports',      icon: <FiFlag />,        path: '/admin/reports' },
  { label: 'Settings',          icon: <FiSettings />,    path: '/admin/settings' },
];

export default function AdminDashboard() {
  const { stats, recentActivity, loading } = useDashboard('admin');

  return (
    <DashboardLayout>
      <div className="gn-admin-dash">

        <div className="gn-dash-welcome gn-admin-welcome">
          <div>
            <h1>Admin Dashboard ⚙️</h1>
            <p>Monitor and manage the entire GuardianNet platform.</p>
          </div>
        </div>

        <div className="gn-dash-stats-grid">
          <StatCard
            icon={<FiUsers />}
            label="Total Users"
            value={loading ? '...' : stats?.totalUsers ?? 0}
            color="blue"
          />
          <StatCard
            icon={<FiShield />}
            label="Verified Volunteers"
            value={loading ? '...' : stats?.verifiedVolunteers ?? 0}
            color="green"
          />
          <StatCard
            icon={<FiAlertTriangle />}
            label="Active Emergencies"
            value={loading ? '...' : stats?.activeEmergencies ?? 0}
            color="red"
          />
          <StatCard
            icon={<FiCheckCircle />}
            label="Resolved Today"
            value={loading ? '...' : stats?.resolvedToday ?? 0}
            color="yellow"
          />
        </div>

        <div className="gn-dash-bottom-grid">
          <RecentActivity activities={recentActivity} />
          <div className="gn-dash-right-col">
            <QuickActions actions={QUICK_ACTIONS} />
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}