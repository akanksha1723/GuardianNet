import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiShield, FiInfo, FiStar, FiClock,
  FiAlertTriangle, FiHeart, FiArrowRight,
  FiUser, FiLogOut,
} from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import './WelcomePage.css';

const SITE_SECTIONS = [
  {
    icon: <FiInfo />,
    title: 'About GuardianNet',
    desc: 'Our mission, who built this, and why it matters.',
    path: '/about',
    color: 'blue',
  },
  {
    icon: <FiStar />,
    title: 'Features',
    desc: 'Everything the platform can do — for users, volunteers, and admins.',
    path: '/features',
    color: 'yellow',
  },
  {
    icon: <FiClock />,
    title: 'How It Works',
    desc: 'Step-by-step guide for users and volunteers.',
    path: '/how-it-works',
    color: 'green',
  },
  {
    icon: <FiAlertTriangle />,
    title: 'Emergency Categories',
    desc: 'All 10 emergency types and when to use each one.',
    path: '/categories',
    color: 'red',
  },
  {
    icon: <FiHeart />,
    title: 'Safety Tips',
    desc: 'Practical safety advice for everyday situations.',
    path: '/safety-tips',
    color: 'green',
  },
  {
    icon: <FiShield />,
    title: 'FAQ',
    desc: 'Common questions about privacy, verification, and escalation.',
    path: '/faq',
    color: 'blue',
  },
];

const COLOR_MAP = {
  blue:   { bg: 'rgba(36,81,196,0.08)',  border: 'rgba(36,81,196,0.2)',  icon: 'rgba(36,81,196,0.12)',  iconColor: '#2451c4' },
  red:    { bg: 'rgba(230,57,70,0.08)',  border: 'rgba(230,57,70,0.2)',  icon: 'rgba(230,57,70,0.12)',  iconColor: '#e63946' },
  green:  { bg: 'rgba(31,157,110,0.08)', border: 'rgba(31,157,110,0.2)', icon: 'rgba(31,157,110,0.12)', iconColor: '#1f9d6e' },
  yellow: { bg: 'rgba(217,142,28,0.08)', border: 'rgba(217,142,28,0.2)', icon: 'rgba(217,142,28,0.12)', iconColor: '#d98e1c' },
};

export default function WelcomePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <div className="gn-welcome">

      {/* Top bar */}
      <header className="gn-welcome-topbar">
        <div className="gn-container gn-welcome-topbar-inner">
          <div className="gn-brand">
            <span className="gn-brand-icon"><FiShield /></span>
            <span className="gn-brand-text">
              Guardian<span className="gn-brand-accent">Net</span>
            </span>
          </div>
          <div className="gn-welcome-topbar-actions">
            <Link to="/dashboard" className="gn-btn gn-btn-primary">
              Go to Dashboard <FiArrowRight />
            </Link>
            <button type="button" className="gn-btn gn-btn-ghost" onClick={handleLogout}>
              <FiLogOut /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="gn-welcome-hero">
        <div className="gn-container">
          <div className="gn-welcome-hero-content">
            <span className="gn-welcome-badge">
              ● You are now protected
            </span>
            <h1>
              Welcome to GuardianNet,<br />
              <span className="gn-welcome-name">{user?.name?.split(' ')[0]} 👋</span>
            </h1>
            <p>
              Your account is set up and you are part of the GuardianNet community.
              Explore the platform below, or go straight to your dashboard.
            </p>
            <div className="gn-welcome-hero-btns">
              <Link to="/dashboard" className="gn-btn gn-btn-danger gn-btn-lg">
                <FiAlertTriangle /> Open Dashboard
              </Link>
              <Link to="/emergency/contacts" className="gn-btn gn-btn-ghost gn-btn-lg">
                <FiUser /> Set Up Emergency Contacts
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="gn-container gn-welcome-body">

        <div className="gn-welcome-quick">
          <h2>Quick Setup Checklist</h2>
          <div className="gn-welcome-checklist">
            {[
              { label: 'Add emergency contacts',    path: '/emergency/contacts', done: false },
              { label: 'Allow GPS location access', path: '/dashboard',          done: false },
              { label: 'Try the SOS button',        path: '/emergency',          done: false },
              ...(user?.role === 'volunteer'
                ? [{ label: 'Submit volunteer verification', path: '/volunteer/verify', done: false }]
                : []),
            ].map((item) => (
              <Link key={item.label} to={item.path} className="gn-welcome-checklist-item">
                <span className="gn-welcome-check-circle" />
                <span>{item.label}</span>
                <FiArrowRight className="gn-welcome-check-arrow" />
              </Link>
            ))}
          </div>
        </div>

        {/* Site sections */}
        <div>
          <h2>Explore GuardianNet</h2>
          <p className="gn-welcome-explore-sub">
            Click any section to learn more — each opens its own full page.
          </p>
          <div className="gn-welcome-sections-grid">
            {SITE_SECTIONS.map((section) => {
              const c = COLOR_MAP[section.color];
              return (
                <Link
                  key={section.path}
                  to={section.path}
                  className="gn-welcome-section-card"
                  style={{ background: c.bg, borderColor: c.border }}
                >
                  <span
                    className="gn-welcome-section-icon"
                    style={{ background: c.icon, color: c.iconColor }}
                  >
                    {section.icon}
                  </span>
                  <div className="gn-welcome-section-text">
                    <h3>{section.title}</h3>
                    <p>{section.desc}</p>
                  </div>
                  <FiArrowRight
                    className="gn-welcome-section-arrow"
                    style={{ color: c.iconColor }}
                  />
                </Link>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}