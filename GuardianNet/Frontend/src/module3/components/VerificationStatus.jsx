import React from 'react';
import { FiClock, FiCheckCircle, FiXCircle, FiShield } from 'react-icons/fi';
import './VerificationStatus.css';

const STATUS_CONFIG = {
  pending: {
    icon: <FiClock />,
    label: 'Application Pending',
    desc: 'Your application has been submitted. Admin will review it within 24-48 hours.',
    color: 'yellow',
  },
  under_review: {
    icon: <FiShield />,
    label: 'Under Review',
    desc: 'Admin is currently reviewing your documents.',
    color: 'blue',
  },
  approved: {
    icon: <FiCheckCircle />,
    label: 'Verified Volunteer',
    desc: 'You are a verified volunteer and can receive emergency requests.',
    color: 'green',
  },
  rejected: {
    icon: <FiXCircle />,
    label: 'Application Rejected',
    desc: 'Your application was rejected. Please contact support for more information.',
    color: 'red',
  },
};

export default function VerificationStatus({ status = 'pending', note = '' }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.pending;

  return (
    <div className={`gn-verify-status gn-verify-status--${config.color}`}>
      <span className="gn-verify-icon">{config.icon}</span>
      <div>
        <h4>{config.label}</h4>
        <p>{config.desc}</p>
        {note && <p className="gn-verify-note">Admin note: {note}</p>}
      </div>
    </div>
  );
}