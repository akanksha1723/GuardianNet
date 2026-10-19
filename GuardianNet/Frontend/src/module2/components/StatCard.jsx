import React from 'react';
import './StatCard.css';

export default function StatCard({ icon, label, value, color = 'blue', trend }) {
  return (
    <div className={`gn-stat-card gn-stat-card--${color}`}>
      <div className="gn-stat-card-icon">{icon}</div>
      <div className="gn-stat-card-body">
        <span className="gn-stat-card-value gn-mono">{value ?? '—'}</span>
        <span className="gn-stat-card-label">{label}</span>
        {trend && (
          <span className={`gn-stat-card-trend ${trend > 0 ? 'up' : 'down'}`}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% this week
          </span>
        )}
      </div>
    </div>
  );
}