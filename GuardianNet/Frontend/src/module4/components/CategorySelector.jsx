import React from 'react';
import {
  FiHeart, FiAlertOctagon, FiEye, FiTruck, FiTool,
  FiZap, FiUsers, FiShield, FiUserPlus, FiLifeBuoy,
} from 'react-icons/fi';
import './CategorySelector.css';

const CATEGORIES = [
  { value: 'medical',           label: 'Medical',      icon: <FiHeart />,        urgent: true  },
  { value: 'harassment',        label: 'Harassment',   icon: <FiAlertOctagon />, urgent: true  },
  { value: 'stalking',          label: 'Stalking',     icon: <FiEye />,          urgent: true  },
  { value: 'accident',          label: 'Accident',     icon: <FiTruck />,        urgent: true  },
  { value: 'vehicle_breakdown', label: 'Breakdown',    icon: <FiTool />,         urgent: false },
  { value: 'fire',              label: 'Fire',         icon: <FiZap />,          urgent: true  },
  { value: 'escort',            label: 'Escort',       icon: <FiUsers />,        urgent: false },
  { value: 'child_safety',      label: 'Child Safety', icon: <FiShield />,       urgent: true  },
  { value: 'elderly',           label: 'Elderly',      icon: <FiUserPlus />,     urgent: false },
  { value: 'general',           label: 'General SOS',  icon: <FiLifeBuoy />,     urgent: false },
];

export default function CategorySelector({ selected, onSelect }) {
  return (
    <div className="gn-cat-selector">
      <h3>What kind of help do you need?</h3>
      <p>Choose the category that best describes your situation</p>
      <div className="gn-cat-grid">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            type="button"
            className={`gn-cat-item ${selected === cat.value ? 'is-selected' : ''} ${cat.urgent ? 'is-urgent' : ''}`}
            onClick={() => onSelect(cat.value)}
          >
            <span className="gn-cat-icon">{cat.icon}</span>
            <span className="gn-cat-label">{cat.label}</span>
            {cat.urgent && <span className="gn-cat-urgent-dot" />}
          </button>
        ))}
      </div>
    </div>
  );
}