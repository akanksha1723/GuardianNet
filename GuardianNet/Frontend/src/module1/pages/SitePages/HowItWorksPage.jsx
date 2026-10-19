import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiArrowLeft, FiAlertTriangle, FiUsers,
  FiMapPin, FiMessageCircle, FiCheckCircle,
  FiShield, FiStar,
} from 'react-icons/fi';
import './SitePage.css';

const USER_STEPS = [
  { n: '01', icon: <FiShield />,         title: 'Create Account',            body: 'Register in two minutes. Grant GPS and notification permission when prompted.', color: 'blue' },
  { n: '02', icon: <FiAlertTriangle />,  title: 'Press Emergency SOS',       body: 'Hold the big red SOS button for 3 seconds, or shake your phone. Choose the emergency category.', color: 'red' },
  { n: '03', icon: <FiUsers />,          title: 'Volunteers Are Notified',   body: 'Nearby verified volunteers instantly receive your alert. They only see your approximate area — not your exact location yet.', color: 'yellow' },
  { n: '04', icon: <FiMapPin />,         title: 'Volunteer Accepts',         body: 'A volunteer accepts your request. Your exact GPS location is now shared only with them. Live tracking begins.', color: 'green' },
  { n: '05', icon: <FiMessageCircle />,  title: 'Chat and Call',             body: 'In-app chat and voice calling open automatically. Your volunteer can see their route to you in real time.', color: 'blue' },
  { n: '06', icon: <FiCheckCircle />,    title: 'Help Arrives',              body: 'Your volunteer reaches you. Once the situation is resolved, mark it complete and rate your volunteer.', color: 'green' },
  { n: '07', icon: <FiStar />,           title: 'Rate & Review',             body: 'Your rating helps the community. Good volunteers earn higher trust scores and priority matching.', color: 'yellow' },
];

const VOLUNTEER_STEPS = [
  { n: '01', icon: <FiShield />,         title: 'Apply to Volunteer',        body: 'Submit your government ID and select which emergency categories you can handle.', color: 'blue' },
  { n: '02', icon: <FiCheckCircle />,    title: 'Get Verified',              body: 'Admin reviews your documents within 24–48 hours. Once approved, you receive a Verified badge.', color: 'green' },
  { n: '03', icon: <FiBell />,           title: 'Receive Requests',          body: 'When someone nearby sends an SOS, you get an instant notification with the approximate area and category.', color: 'yellow' },
  { n: '04', icon: <FiMapPin />,         title: 'Accept & Navigate',         body: 'Accept the request — exact location unlocks. Navigate to the user with turn-by-turn directions.', color: 'red' },
  { n: '05', icon: <FiMessageCircle />,  title: 'Chat & Call',               body: 'Stay in contact with the user throughout. Keep them calm and informed of your ETA.', color: 'blue' },
  { n: '06', icon: <FiStar />,           title: 'Complete & Earn Trust',     body: 'Mark the emergency complete. Your trust score grows with every successful response.', color: 'green' },
];

const FiBell = () => <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>;

export default function HowItWorksPage() {
  const [view, setView] = useState('user');

  const steps = view === 'user' ? USER_STEPS : VOLUNTEER_STEPS;

  return (
    <div className="gn-sitepage">
      <div className="gn-sitepage-hero" style={{ background: 'linear-gradient(135deg, #1f9d6e, #0b1330)' }}>
        <div className="gn-container">
          <Link to="/welcome" className="gn-sitepage-back">
            <FiArrowLeft /> Back
          </Link>
          <div className="gn-sitepage-hero-icon" style={{ background: 'rgba(255,255,255,0.15)' }}>
            <FiCheckCircle />
          </div>
          <h1>How It Works</h1>
          <p>From SOS to help — every step explained clearly.</p>
        </div>
      </div>

      <div className="gn-container gn-sitepage-body">

        <div className="gn-sitepage-tabs">
          <button
            type="button"
            className={`gn-sitepage-tab ${view === 'user' ? 'is-active' : ''}`}
            onClick={() => setView('user')}
          >
            I Need Help
          </button>
          <button
            type="button"
            className={`gn-sitepage-tab ${view === 'volunteer' ? 'is-active' : ''}`}
            onClick={() => setView('volunteer')}
          >
            I Want to Volunteer
          </button>
        </div>

        <div className="gn-sitepage-steps">
          {steps.map((step, i) => (
            <div key={step.n} className="gn-sitepage-step">
              <div className={`gn-sitepage-step-circle gn-sitepage-step-circle--${step.color}`}>
                {step.icon}
              </div>
              {i < steps.length - 1 && (
                <div className="gn-sitepage-step-line" />
              )}
              <div className="gn-sitepage-step-content">
                <span className="gn-sitepage-step-num gn-mono">{step.n}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="gn-sitepage-cta">
          <h2>Ready to get started?</h2>
          <div className="gn-sitepage-cta-btns">
            <Link to="/register" className="gn-btn gn-btn-danger gn-btn-lg">
              {view === 'user' ? 'Get Protected' : 'Become a Volunteer'}
            </Link>
            <Link to="/welcome" className="gn-btn gn-btn-ghost gn-btn-lg">Back to Overview</Link>
          </div>
        </div>

      </div>
    </div>
  );
}