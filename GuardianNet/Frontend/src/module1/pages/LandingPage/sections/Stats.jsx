import React from 'react';
import './Stats.css';

const STATS = [
  { value: '12,400+', label: 'Verified volunteers' },
  { value: '< 28s',   label: 'Average response time' },
  { value: '38,900+', label: 'Emergencies resolved' },
  { value: '4.9/5',   label: 'Average volunteer rating' },
];

export default function Stats() {
  return (
    <section className="gn-stats">
      <div className="gn-container gn-stats-grid">
        {STATS.map((stat) => (
          <div key={stat.label} className="gn-stat">
            <span className="gn-stat-value gn-mono">{stat.value}</span>
            <span className="gn-stat-label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}