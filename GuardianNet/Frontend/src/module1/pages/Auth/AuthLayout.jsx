import React from 'react';
import { Link } from 'react-router-dom';
import { FiShield } from 'react-icons/fi';
import './AuthLayout.css';

export default function AuthLayout({ children, panelTitle, panelSubtitle }) {
  return (
    <div className="gn-auth-shell">
      <div className="gn-auth-form-pane">
        <Link to="/" className="gn-brand gn-auth-brand">
          <span className="gn-brand-icon">
            <FiShield />
          </span>
          <span className="gn-brand-text">
            Guardian<span className="gn-brand-accent">Net</span>
          </span>
        </Link>
        <div className="gn-auth-form-wrap">{children}</div>
      </div>

      <div className="gn-auth-decor-pane">
        <div className="gn-auth-decor-glow" aria-hidden="true" />
        <div className="gn-auth-decor-content">
          <span className="gn-eyebrow gn-eyebrow-on-dark">Community Safety Network</span>
          <h2>{panelTitle}</h2>
          <p>{panelSubtitle}</p>
          <ul className="gn-auth-decor-list">
            <li>Verified volunteers, real accountability</li>
            <li>Location hidden until a request is accepted</li>
            <li>Live tracking, chat, and voice in one place</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
