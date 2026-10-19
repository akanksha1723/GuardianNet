import React from 'react';
import {
  FiAlertTriangle, FiClock, FiUsers,
  FiStar, FiMapPin, FiPhone, FiUser, FiShield,
} from 'react-icons/fi';
import DashboardLayout from '../../components/DashboardLayout';
import StatCard from '../../components/StatCard';
import QuickActions from '../../components/QuickActions';
import RecentActivity from '../../components/RecentActivity';
import { useAuth } from '../../../module1/contexts/AuthContext';
import { useDashboard } from '../../hooks/useDashboard';
import './UserDashboard.css';

const QUICK_ACTIONS = [
  { label: 'Emergency SOS', icon: <FiAlertTriangle />, path: '/emergency', danger: true },
  { label: 'Nearby Help',   icon: <FiMapPin />,        path: '/nearby' },
  { label: 'Voice Call',    icon: <FiPhone />,         path: '/call' },
  { label: 'My Profile',    icon: <FiUser />,          path: '/profile' },
];

export default function UserDashboard() {
  const { user } = useAuth();
  const { stats, recentActivity, loading } = useDashboard('user');

  return (
    <DashboardLayout>
      <div className="gn-user-dash">

        {/* ── Welcome header ── */}
        <div className="gn-dash-welcome">
          <div>
            <h1>Welcome back, {user?.name?.split(' ')[0]} 👋</h1>
            <p>You are protected by the GuardianNet community.</p>
          </div>
          <button
            type="button"
            className="gn-btn gn-btn-danger gn-sos-dash-btn"
            onClick={() => window.location.href = '/emergency'}
          >
            <FiAlertTriangle /> Emergency SOS
          </button>
        </div>

        {/* ── Stat cards ── */}
        <div className="gn-dash-stats-grid">
          <StatCard
            icon={<FiAlertTriangle />}
            label="Total Emergencies"
            value={loading ? '...' : stats?.totalEmergencies ?? 0}
            color="red"
          />
          <StatCard
            icon={<FiUsers />}
            label="Volunteers Nearby"
            value={loading ? '...' : stats?.volunteersNearby ?? 0}
            color="blue"
          />
          <StatCard
            icon={<FiClock />}
            label="Avg Response Time"
            value={loading ? '...' : stats?.avgResponseTime ?? 'N/A'}
            color="yellow"
          />
          <StatCard
            icon={<FiStar />}
            label="Avg Volunteer Rating"
            value={loading ? '...' : stats?.avgRating ?? 'N/A'}
            color="green"
          />
        </div>

        {/* ── Bottom grid ── */}
        <div className="gn-dash-bottom-grid">
          <RecentActivity activities={recentActivity} />
          <div className="gn-dash-right-col">
            <QuickActions actions={QUICK_ACTIONS} />
            <div className="gn-dash-safety-card">
              <FiShield className="gn-dash-safety-icon" />
              <div>
                <h4>You are protected</h4>
                <p>
                  {loading ? '...' : stats?.volunteersNearby ?? 0} verified
                  volunteers are active in your area right now.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}