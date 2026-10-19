import React from 'react';
import './RecentActivity.css';

const PLACEHOLDER = [
  { id: 1, type: 'info',    text: 'Account created successfully',      time: 'Just now' },
  { id: 2, type: 'success', text: 'Profile setup complete',            time: '2 min ago' },
  { id: 3, type: 'info',    text: 'Welcome to GuardianNet!',           time: '5 min ago' },
];

export default function RecentActivity({ activities = [] }) {
  const items = activities.length > 0 ? activities : PLACEHOLDER;

  return (
    <div className="gn-activity">
      <h3 className="gn-activity-title">Recent Activity</h3>
      <div className="gn-activity-list">
        {items.map((item) => (
          <div key={item.id} className={`gn-activity-item gn-activity-item--${item.type}`}>
            <span className="gn-activity-dot" />
            <div className="gn-activity-content">
              <p className="gn-activity-text">{item.text}</p>
              <span className="gn-activity-time">{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}