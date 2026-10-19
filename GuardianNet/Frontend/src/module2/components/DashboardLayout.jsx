import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  FiShield, FiHome, FiAlertTriangle, FiClock,
  FiBell, FiUser, FiLogOut, FiMenu, FiX,
  FiUsers, FiBarChart2, FiSettings, FiMapPin,
} from 'react-icons/fi';
import { useAuth } from '../../module1/contexts/AuthContext';
import ThemeToggle from '../../module1/components/common/ThemeToggle';
import './DashboardLayout.css';

const USER_NAV = [
  { label: 'Dashboard',          icon: <FiHome />,          path: '/dashboard' },
  { label: 'Emergency SOS',      icon: <FiAlertTriangle />, path: '/emergency' },
  { label: 'Emergency History',  icon: <FiClock />,         path: '/history' },
  { label: 'Nearby Helpers',     icon: <FiMapPin />,        path: '/nearby' },
  { label: 'Notifications',      icon: <FiBell />,          path: '/notifications' },
  { label: 'Profile',            icon: <FiUser />,          path: '/profile' },
];

const VOLUNTEER_NAV = [
  { label: 'Dashboard',          icon: <FiHome />,          path: '/volunteer/dashboard' },
  { label: 'Emergency Requests', icon: <FiAlertTriangle />, path: '/volunteer/requests' },
  { label: 'My History',         icon: <FiClock />,         path: '/volunteer/history' },
  { label: 'Notifications',      icon: <FiBell />,          path: '/notifications' },
  { label: 'Profile',            icon: <FiUser />,          path: '/profile' },
];

const ADMIN_NAV = [
  { label: 'Dashboard',          icon: <FiHome />,          path: '/admin/dashboard' },
  { label: 'Users',              icon: <FiUsers />,         path: '/admin/users' },
  { label: 'Volunteers',         icon: <FiShield />,        path: '/admin/volunteers' },
  { label: 'Analytics',          icon: <FiBarChart2 />,     path: '/admin/analytics' },
  { label: 'Settings',           icon: <FiSettings />,      path: '/admin/settings' },
];

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks =
    user?.role === 'admin'
      ? ADMIN_NAV
      : user?.role === 'volunteer'
      ? VOLUNTEER_NAV
      : USER_NAV;

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <div className="gn-dash-shell">

      {/* ── Sidebar ── */}
      <aside className={`gn-dash-sidebar ${sidebarOpen ? 'is-open' : ''}`}>
        <div className="gn-dash-sidebar-header">
          <Link to="/" className="gn-brand">
            <span className="gn-brand-icon"><FiShield /></span>
            <span className="gn-brand-text">
              Guardian<span className="gn-brand-accent">Net</span>
            </span>
          </Link>
          <button
            type="button"
            className="gn-dash-sidebar-close"
            onClick={() => setSidebarOpen(false)}
          >
            <FiX />
          </button>
        </div>

        <div className="gn-dash-user-pill">
          <div className="gn-dash-user-avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="gn-dash-user-name">{user?.name}</p>
            <span className="gn-dash-user-role">{user?.role}</span>
          </div>
        </div>

        <nav className="gn-dash-nav">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`gn-dash-nav-item ${location.pathname === link.path ? 'is-active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="gn-dash-logout"
          onClick={handleLogout}
        >
          <FiLogOut /> Log Out
        </button>
      </aside>

      {/* ── Overlay for mobile ── */}
      {sidebarOpen && (
        <div
          className="gn-dash-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Main content ── */}
      <div className="gn-dash-main">
        <header className="gn-dash-topbar">
          <button
            type="button"
            className="gn-dash-menu-btn"
            onClick={() => setSidebarOpen(true)}
          >
            <FiMenu />
          </button>
          <div className="gn-dash-topbar-right">
            <ThemeToggle />
            <Link to="/notifications" className="gn-dash-notif-btn">
              <FiBell />
            </Link>
            <Link to="/profile" className="gn-dash-avatar">
              {user?.name?.charAt(0).toUpperCase()}
            </Link>
          </div>
        </header>

        <div className="gn-dash-content">
          {children}
        </div>
      </div>

    </div>
  );
}