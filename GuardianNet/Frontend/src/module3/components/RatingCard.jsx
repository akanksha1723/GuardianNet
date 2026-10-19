import React from 'react';
import { FiStar } from 'react-icons/fi';
import './RatingCard.css';

export default function RatingCard({ rating, reviewer, comment, date }) {
  return (
    <div className="gn-rating-card">
      <div className="gn-rating-stars">
        {Array.from({ length: 5 }).map((_, i) => (
          <FiStar
            key={i}
            className={i < rating ? 'filled' : ''}
          />
        ))}
        <span className="gn-rating-num">{rating}/5</span>
      </div>
      {comment && <p className="gn-rating-comment">"{comment}"</p>}
      <div className="gn-rating-meta">
        <span>{reviewer || 'Anonymous User'}</span>
        <span>{date ? new Date(date).toLocaleDateString() : ''}</span>
      </div>
    </div>
  );
}