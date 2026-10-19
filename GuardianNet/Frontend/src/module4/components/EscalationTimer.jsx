import React from 'react';
import { FiClock, FiBell, FiPhone, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi';
import './EscalationTimer.css';

export default function EscalationTimer({
  countdown,
  escalated,
  emergencyNumbers,
  contactsNotified = 0,
}) {
  const pct = ((30 - countdown) / 30) * 100;

  if (escalated) {
    return (
      <div className="gn-escalation gn-escalation--done">
        <div className="gn-escalation-done-header">
          <FiBell className="gn-escalation-done-icon" />
          <div>
            <h4>No volunteer responded — Escalated</h4>
            <p>The following actions have been taken automatically:</p>
          </div>
        </div>

        <div className="gn-escalation-actions-taken">
          <div className="gn-escalation-action">
            <FiCheckCircle />
            <span>
              {contactsNotified > 0
                ? `${contactsNotified} emergency contact${contactsNotified > 1 ? 's' : ''} notified via SMS`
                : 'Emergency contacts notified (add contacts in settings for SMS alerts)'}
            </span>
          </div>
          <div className="gn-escalation-action">
            <FiCheckCircle />
            <span>Security personnel alerted</span>
          </div>
        </div>

        <div className="gn-escalation-official">
          <div className="gn-escalation-official-header">
            <FiPhone />
            <strong>Call official emergency services now:</strong>
          </div>
          <div className="gn-emergency-numbers-grid">
            <a href={`tel:${emergencyNumbers?.unified || '112'}`} className="gn-em-num gn-em-num--primary">
              <span className="gn-em-num-val">{emergencyNumbers?.unified || '112'}</span>
              <span className="gn-em-num-label">Unified Emergency</span>
            </a>
            <a href={`tel:${emergencyNumbers?.police || '100'}`} className="gn-em-num">
              <span className="gn-em-num-val">{emergencyNumbers?.police || '100'}</span>
              <span className="gn-em-num-label">Police</span>
            </a>
            <a href={`tel:${emergencyNumbers?.ambulance || '108'}`} className="gn-em-num">
              <span className="gn-em-num-val">{emergencyNumbers?.ambulance || '108'}</span>
              <span className="gn-em-num-label">Ambulance</span>
            </a>
            <a href={`tel:${emergencyNumbers?.fire || '101'}`} className="gn-em-num">
              <span className="gn-em-num-val">{emergencyNumbers?.fire || '101'}</span>
              <span className="gn-em-num-label">Fire</span>
            </a>
            <a href={`tel:${emergencyNumbers?.women || '1091'}`} className="gn-em-num">
              <span className="gn-em-num-val">{emergencyNumbers?.women || '1091'}</span>
              <span className="gn-em-num-label">Women Helpline</span>
            </a>
            <a href={`tel:${emergencyNumbers?.child || '1098'}`} className="gn-em-num">
              <span className="gn-em-num-val">{emergencyNumbers?.child || '1098'}</span>
              <span className="gn-em-num-label">Child Helpline</span>
            </a>
          </div>
          {emergencyNumbers?.local && (
            <p className="gn-escalation-local">
              <FiAlertTriangle /> Local: {emergencyNumbers.local}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="gn-escalation">
      <div className="gn-escalation-ring">
        <svg viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="34" className="gn-esc-track" />
          <circle
            cx="40" cy="40" r="34"
            className="gn-esc-fill"
            strokeDasharray={`${2 * Math.PI * 34}`}
            strokeDashoffset={`${2 * Math.PI * 34 * (1 - pct / 100)}`}
          />
        </svg>
        <div className="gn-escalation-count">
          <FiClock />
          <span>{countdown}s</span>
        </div>
      </div>
      <div>
        <h4>Finding a volunteer…</h4>
        <p>
          If no one accepts in{' '}
          <strong style={{ color: 'var(--gn-red-500)' }}>{countdown} seconds</strong>,
          we will automatically:
        </p>
        <ul className="gn-escalation-will-do">
          <li>📱 Send SMS to your emergency contacts</li>
          <li>🔒 Alert security personnel</li>
          <li>📞 Show official emergency numbers</li>
        </ul>
      </div>
    </div>
  );
}