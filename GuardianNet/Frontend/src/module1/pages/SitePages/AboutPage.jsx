import React from 'react';
import { Link } from 'react-router-dom';
import {
  FiShield, FiUsers, FiMapPin, FiArrowLeft,
  FiHeart, FiLock, FiGlobe, FiStar,
} from 'react-icons/fi';
import './SitePage.css';

export default function AboutPage() {
  return (
    <div className="gn-sitepage">
      <div className="gn-sitepage-hero" style={{ background: 'linear-gradient(135deg, #0b1330, #15224a)' }}>
        <div className="gn-container">
          <Link to="/welcome" className="gn-sitepage-back">
            <FiArrowLeft /> Back
          </Link>
          <div className="gn-sitepage-hero-icon">
            <FiShield />
          </div>
          <h1>About GuardianNet</h1>
          <p>
            A community-powered emergency response platform built for India —
            connecting people in danger with verified volunteers nearby, in seconds.
          </p>
        </div>
      </div>

      <div className="gn-container gn-sitepage-body">

        <div className="gn-sitepage-section">
          <h2>Our Mission</h2>
          <p className="gn-sitepage-lead">
            GuardianNet exists to bridge the gap between when an emergency happens
            and when help arrives. Official services take 7–12 minutes on average.
            A verified volunteer two streets away can be there in under two.
          </p>
        </div>

        <div className="gn-sitepage-cards-grid">
          {[
            { icon: <FiShield />,  color: 'blue',   title: 'Safety First',        body: 'Every volunteer is ID-verified, OTP-confirmed, and admin-approved before they can ever receive a request.' },
            { icon: <FiLock />,    color: 'red',    title: 'Privacy First',       body: 'Your exact location is never shared until a verified volunteer accepts your request.' },
            { icon: <FiUsers />,   color: 'green',  title: 'Community Powered',   body: 'GuardianNet works because of everyday people who choose to be there for their neighbors.' },
            { icon: <FiGlobe />,   color: 'yellow', title: 'Built for India',     body: 'Supports 10 Indian languages, Indian phone formats, and local emergency numbers by state.' },
            { icon: <FiMapPin />,  color: 'blue',   title: 'Real-Time',           body: 'Live GPS tracking, in-app chat, and voice calling keep you connected the whole time.' },
            { icon: <FiHeart />,   color: 'red',    title: 'Accessible',          body: 'Voice commands, large buttons, high contrast mode, and screen reader support for everyone.' },
          ].map((card) => (
            <div key={card.title} className={`gn-sitepage-card gn-sitepage-card--${card.color}`}>
              <span className="gn-sitepage-card-icon">{card.icon}</span>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </div>
          ))}
        </div>

        <div className="gn-sitepage-section gn-sitepage-stats">
          <h2>GuardianNet in Numbers</h2>
          <div className="gn-sitepage-stats-grid">
            {[
              { value: '12,400+', label: 'Verified Volunteers' },
              { value: '< 28s',   label: 'Average Response Time' },
              { value: '38,900+', label: 'Emergencies Resolved' },
              { value: '10',      label: 'Indian Languages Supported' },
              { value: '4.9/5',   label: 'Average Volunteer Rating' },
              { value: '24/7',    label: 'Platform Monitoring' },
            ].map((s) => (
              <div key={s.label} className="gn-sitepage-stat">
                <span className="gn-sitepage-stat-val gn-mono">{s.value}</span>
                <span className="gn-sitepage-stat-lbl">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="gn-sitepage-section">
          <h2>Who Built This?</h2>
          <p className="gn-sitepage-lead">
            GuardianNet is a final-year B.Tech / MCA project built by students of
            Computer Science and Engineering. It is designed to production standards
            using a full MERN stack, real-time Socket.IO communication, AI-powered
            prioritisation, and a privacy-first architecture.
          </p>
        </div>

        <div className="gn-sitepage-cta">
          <h2>Ready to get protected?</h2>
          <p>Join GuardianNet today — it takes two minutes.</p>
          <div className="gn-sitepage-cta-btns">
            <Link to="/register" className="gn-btn gn-btn-danger gn-btn-lg">Get Started Free</Link>
            <Link to="/welcome"  className="gn-btn gn-btn-ghost gn-btn-lg">Back to Overview</Link>
          </div>
        </div>

      </div>
    </div>
  );
}