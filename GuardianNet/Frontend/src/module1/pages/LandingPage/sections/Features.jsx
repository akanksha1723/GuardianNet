import React from 'react';
import {
  FiMapPin, FiMessageCircle, FiPhoneCall,
  FiUserCheck, FiEyeOff, FiBell,
} from 'react-icons/fi';
import './Features.css';

const FEATURES = [
  {
    icon: <FiUserCheck />,
    title: 'ID-Verified Volunteers',
    desc: 'Every volunteer passes government ID checks and admin approval before they can ever receive a request.',
  },
  {
    icon: <FiEyeOff />,
    title: 'Privacy by Default',
    desc: 'Your exact location stays hidden — volunteers only see your approximate area and category until they accept.',
  },
  {
    icon: <FiMapPin />,
    title: 'Live GPS Tracking',
    desc: 'Once accepted, track your volunteer in real time and share that view with trusted contacts.',
  },
  {
    icon: <FiMessageCircle />,
    title: 'In-App Chat',
    desc: 'Typing indicators, read receipts, and message history so you stay connected the whole time.',
  },
  {
    icon: <FiPhoneCall />,
    title: 'Voice Calling',
    desc: "Switch to a voice call with one tap when typing isn't fast enough or safe enough.",
  },
  {
    icon: <FiBell />,
    title: 'Automatic Escalation',
    desc: 'No response in 30 seconds? We notify your emergency contacts and security personnel automatically.',
  },
];

export default function Features() {
  return (
    <section id="features" className="gn-section">
      <div className="gn-container">
        <span className="gn-eyebrow">Platform</span>
        <h2 className="gn-section-title">Everything an emergency response needs</h2>
        <p className="gn-section-sub">
          Built around one priority: getting real help to the right person,
          fast, without compromising their safety or privacy.
        </p>
        <div className="gn-features-grid">
          {FEATURES.map((f) => (
            <div key={f.title} className="gn-card gn-feature-card">
              <span className="gn-feature-icon">{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}