import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiArrowLeft, FiMapPin, FiMessageCircle, FiPhoneCall,
  FiUserCheck, FiEyeOff, FiBell, FiCpu, FiShieldOff,
  FiNavigation, FiAlertTriangle, FiPhone, FiShield,
} from 'react-icons/fi';
import './SitePage.css';

const CATEGORIES = [
  { id: 'user',      label: 'For Users' },
  { id: 'volunteer', label: 'For Volunteers' },
  { id: 'ai',        label: 'AI Features' },
  { id: 'safety',    label: 'Safety' },
];

const FEATURES = {
  user: [
    { icon: <FiAlertTriangle />, title: 'Emergency SOS',        body: 'Hold the SOS button for 3 seconds or shake your phone to instantly send an emergency alert to nearby verified volunteers.', color: 'red' },
    { icon: <FiMapPin />,        title: 'Live GPS Tracking',     body: 'Once a volunteer accepts your request, track them in real time on a live map and share your exact location securely.', color: 'blue' },
    { icon: <FiMessageCircle />, title: 'In-App Chat',           body: 'Chat with your volunteer in real time. Typing indicators, read receipts, and full message history included.', color: 'green' },
    { icon: <FiPhoneCall />,     title: 'Voice Calling',         body: 'Switch to a voice call with your volunteer instantly — no phone number exchange needed.', color: 'blue' },
    { icon: <FiBell />,          title: 'Auto-Escalation',       body: 'If no volunteer accepts in 30 seconds, GuardianNet simultaneously notifies all your emergency contacts and security personnel.', color: 'yellow' },
    { icon: <FiPhone />,         title: 'Fake Call',             body: 'Trigger a realistic fake incoming call to safely exit a dangerous situation without alerting the threat.', color: 'red' },
    { icon: <FiNavigation />,    title: 'Journey Tracker',       body: 'Share your live journey with trusted contacts. If you deviate from your route, they are alerted automatically.', color: 'green' },
    { icon: <FiEyeOff />,        title: 'Offline SOS',           body: 'No internet? GuardianNet opens your native SMS app with a pre-filled emergency message to your contacts.', color: 'yellow' },
  ],
  volunteer: [
    { icon: <FiUserCheck />,     title: 'Smart Request Matching', body: 'Receive nearby emergency requests matched to your verified skills and the categories you opted into.', color: 'blue' },
    { icon: <FiShield />,        title: 'Trust Score',            body: 'Build your community trust score through successful responses. Higher scores unlock priority matching.', color: 'green' },
    { icon: <FiMapPin />,        title: 'Live Navigation',        body: 'Get turn-by-turn navigation to the user\'s exact location the moment you accept a request.', color: 'blue' },
    { icon: <FiEyeOff />,        title: 'Privacy Before Accept',  body: 'You only see the approximate area and emergency category before accepting — protecting both parties.', color: 'red' },
    { icon: <FiMessageCircle />, title: 'Emergency Chat',         body: 'Chat with the user in real time from the moment you accept, keeping them calm and informed.', color: 'green' },
    { icon: <FiPhoneCall />,     title: 'Voice Calling',          body: 'Call the user directly through the app when typing is not fast enough.', color: 'yellow' },
  ],
  ai: [
    { icon: <FiCpu />,           title: 'Priority Engine',        body: 'AI scores every incoming emergency (1–10) based on category, time of day, movement pattern, and repeat history.', color: 'blue' },
    { icon: <FiShieldOff />,     title: 'Fake Emergency Detection', body: 'Flags suspicious patterns (same category 3+ times per hour, 5+ emergencies per day) for admin review.', color: 'red' },
    { icon: <FiNavigation />,    title: 'Safe Route AI',           body: 'Recommends routes that avoid high-risk areas, using street lighting and crime data.', color: 'green' },
    { icon: <FiMessageCircle />, title: 'AI Chat Assistant',       body: 'A rule-based assistant guides users through emergency situations in real time — what to do, who to call, how to stay safe.', color: 'yellow' },
    { icon: <FiMapPin />,        title: 'Community Heat Map',      body: 'Anonymized, aggregated emergency data shows which areas need more volunteers and attention.', color: 'blue' },
  ],
  safety: [
    { icon: <FiEyeOff />,        title: 'Location Privacy',       body: 'Your exact GPS coordinates are never revealed to anyone until a verified volunteer explicitly accepts your request.', color: 'blue' },
    { icon: <FiUserCheck />,     title: 'Volunteer Verification',  body: 'Government ID + OTP + admin approval — three layers of verification before anyone can receive a request.', color: 'green' },
    { icon: <FiBell />,          title: 'Parallel Contact Alert',  body: 'All emergency contacts are notified simultaneously — first to confirm is assigned, others are automatically stood down.', color: 'red' },
    { icon: <FiShield />,        title: 'JWT + bcrypt Security',   body: 'Industry-standard authentication with token-based sessions and bcrypt password hashing (12 rounds).', color: 'yellow' },
  ],
};

export default function FeaturesPage() {
  const [activeTab, setActiveTab] = useState('user');

  return (
    <div className="gn-sitepage">
      <div className="gn-sitepage-hero" style={{ background: 'linear-gradient(135deg, #2451c4, #0b1330)' }}>
        <div className="gn-container">
          <Link to="/welcome" className="gn-sitepage-back">
            <FiArrowLeft /> Back
          </Link>
          <div className="gn-sitepage-hero-icon" style={{ background: 'rgba(255,255,255,0.15)' }}>
            <FiShield />
          </div>
          <h1>Platform Features</h1>
          <p>Everything GuardianNet can do — for users, volunteers, and the community.</p>
        </div>
      </div>

      <div className="gn-container gn-sitepage-body">

        <div className="gn-sitepage-tabs">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`gn-sitepage-tab ${activeTab === cat.id ? 'is-active' : ''}`}
              onClick={() => setActiveTab(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="gn-sitepage-features-grid">
          {FEATURES[activeTab].map((f) => (
            <div key={f.title} className={`gn-sitepage-feature-card gn-sitepage-card--${f.color}`}>
              <span className="gn-sitepage-card-icon">{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </div>
          ))}
        </div>

        <div className="gn-sitepage-cta">
          <h2>Experience all these features</h2>
          <p>Create your account and get protected in two minutes.</p>
          <div className="gn-sitepage-cta-btns">
            <Link to="/register" className="gn-btn gn-btn-danger gn-btn-lg">Get Started Free</Link>
            <Link to="/welcome"  className="gn-btn gn-btn-ghost gn-btn-lg">Back to Overview</Link>
          </div>
        </div>

      </div>
    </div>
  );
}