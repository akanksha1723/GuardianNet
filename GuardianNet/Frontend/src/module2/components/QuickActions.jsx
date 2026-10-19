import React from 'react';
import { useNavigate } from 'react-router-dom';
import './QuickActions.css';

export default function QuickActions({ actions }) {
  const navigate = useNavigate();

  return (
    <div className="gn-quick-actions">
      <h3 className="gn-quick-actions-title">Quick Actions</h3>
      <div className="gn-quick-actions-grid">
        {actions.map((action) => (
          <button
            key={action.label}
            type="button"
            className={`gn-quick-action-btn ${action.primary ? 'is-primary' : ''} ${action.danger ? 'is-danger' : ''}`}
            onClick={() => action.path ? navigate(action.path) : action.onClick?.()}
          >
            <span className="gn-quick-action-icon">{action.icon}</span>
            <span>{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}