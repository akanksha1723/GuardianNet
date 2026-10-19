import React from 'react';
import { FiShield } from 'react-icons/fi';
import './TrustScoreCard.css';

export default function TrustScoreCard({ score = 0, totalRatings = 0, averageRating = 0 }) {
  const level =
    score >= 80 ? 'Elite' :
    score >= 60 ? 'Trusted' :
    score >= 40 ? 'Good' :
    score >= 20 ? 'New' : 'Starter';

  const color =
    score >= 80 ? 'green' :
    score >= 60 ? 'blue' :
    score >= 40 ? 'yellow' : 'red';

  return (
    <div className={`gn-trust-card gn-trust-card--${color}`}>
      <div className="gn-trust-header">
        <FiShield />
        <span>Trust Score</span>
      </div>
      <div className="gn-trust-score">{score}</div>
      <div className="gn-trust-level">{level} Volunteer</div>
      <div className="gn-trust-bar-track">
        <div
          className="gn-trust-bar-fill"
          style={{ width: `${score}%` }}
        />
      </div>
      <div className="gn-trust-meta">
        <span>⭐ {averageRating || '0.0'} avg rating</span>
        <span>{totalRatings} reviews</span>
      </div>
    </div>
  );
}