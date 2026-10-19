import React from 'react';
import {
  FiHeart, FiAlertOctagon, FiEye, FiTruck, FiTool,
  FiZap, FiUsers, FiShield, FiUserPlus, FiLifeBuoy,
} from 'react-icons/fi';
import './Categories.css';

const CATEGORIES = [
  { icon: <FiHeart />,        label: 'Medical Emergency' },
  { icon: <FiAlertOctagon />, label: 'Harassment' },
  { icon: <FiEye />,          label: 'Stalking' },
  { icon: <FiTruck />,        label: 'Accident' },
  { icon: <FiTool />,         label: 'Vehicle Breakdown' },
  { icon: <FiZap />,          label: 'Fire' },
  { icon: <FiUsers />,        label: 'Need Escort' },
  { icon: <FiShield />,       label: 'Child Safety' },
  { icon: <FiUserPlus />,     label: 'Elderly Assistance' },
  { icon: <FiLifeBuoy />,     label: 'General SOS' },
];

export default function Categories() {
  return (
    <section id="categories" className="gn-section">
      <div className="gn-container">
        <span className="gn-eyebrow">Emergency Categories</span>
        <h2 className="gn-section-title">
          Tell us what's happening — we'll match accordingly
        </h2>
        <p className="gn-section-sub">
          Choosing a category routes your request to volunteers with the
          right skills and shapes how urgently it's escalated.
        </p>
        <div className="gn-categories-grid">
          {CATEGORIES.map((c) => (
            <div key={c.label} className="gn-category-chip">
              <span className="gn-category-icon">{c.icon}</span>
              <span>{c.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}