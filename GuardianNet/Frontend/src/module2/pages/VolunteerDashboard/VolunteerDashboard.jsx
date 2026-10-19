import React, { useState } from 'react';
import {
  FiAlertTriangle, FiClock, FiStar,
  FiCheckCircle, FiToggleLeft, FiToggleRight,
  FiUser, FiMapPin, FiShield,
} from 'react-icons/fi';
import DashboardLayout from '../../components/DashboardLayout';
import StatCard from '../../components/StatCard';
import QuickActions from '../../components/QuickActions';
import RecentActivity from '../../components/RecentActivity';
import { useAuth } from '../../../module1/contexts/AuthContext';
import { useDashboard } from '../../hooks/useDashboard';
import './VolunteerDashboard.css';

const QUICK_ACTIONS = [
  { label: 'View Requests', icon: <FiAlertTriangle />, path: '/volunteer/requests', primary: true },
  { label: 'My History',    icon: <FiClock />,         path: '/volunteer/history' },
  { label: 'My Profile',    icon: <FiUser />,          path: '/profile' },
  { label: 'Live Map',      icon: <FiMapPin />,        path: '/volunteer/map' },
];

export default function VolunteerDashboard() {
  const { user } = useAuth();
  const { stats, recentActivity, loading } = useDashboard('volunteer');
  const [isActive, setIsActive] = useState(true);

  return (
    <DashboardLayout>
      <div className="gn-vol-dash">

        {/* ── Welcome header ── */}
        <div className="gn-dash-welcome gn-vol-welcome">
          <div>
            <h1>Volunteer Dashboard 🛡️</h1>
            <p>Hello {user?.name?.split(' ')[0]} — thank you for keeping the community safe.</p>
          </div>
          <button
            type="button"
            className={`gn-vol-toggle ${isActive ? 'is-active' : ''}`}
            onClick={() => setIsActive((prev) => !prev)}
          >
            {isActive ? <FiToggleRight /> : <FiToggleLeft />}
            {isActive ? 'Available' : 'Unavailable'}
          </button>
        </div>

        {/* ── Verification badge ── */}
        {user?.isVerified ? (
          <div className="gn-vol-verified-badge">
            <FiCheckCircle /> Verified Volunteer — you can receive emergency requests
          </div>
        ) : (
          <div className="gn-vol-pending-badge">
            <FiShield /> Verification Pending — admin will review your documents shortly
          </div>
        )}

        {/* ── Stats ── */}
        <div className="gn-dash-stats-grid">
          <StatCard
            icon={<FiCheckCircle />}
            label="Requests Handled"
            value={loading ? '...' : stats?.requestsHandled ?? 0}
            color="green"
          />
          <StatCard
            icon={<FiStar />}
            label="Trust Score"
            value={loading ? '...' : stats?.trustScore ?? 0}
            color="yellow"
          />
          <StatCard
            icon={<FiClock />}
            label="Avg Response Time"
            value={loading ? '...' : stats?.avgResponseTime ?? 'N/A'}
            color="blue"
          />
          <StatCard
            icon={<FiAlertTriangle />}
            label="Active Requests Nearby"
            value={loading ? '...' : stats?.activeRequestsNearby ?? 0}
            color="red"
          />
        </div>

        {/* ── Bottom grid ── */}
        <div className="gn-dash-bottom-grid">
          <RecentActivity activities={recentActivity} />
          <QuickActions actions={QUICK_ACTIONS} />
        </div>

      </div>
    </DashboardLayout>
  );
}