import React, { useState, useEffect } from 'react';
import { FiAlertTriangle, FiClock, FiCheckCircle, FiX, FiStar } from 'react-icons/fi';
import DashboardLayout from '../../../module2/components/DashboardLayout';
import { getEmergencyHistory, rateEmergency } from '../../services/emergencyService';
import './EmergencyHistory.css';

const STATUS_CONFIG = {
  completed:  { label: 'Completed',  icon: <FiCheckCircle />, color: 'green' },
  cancelled:  { label: 'Cancelled',  icon: <FiX />,           color: 'red'   },
  escalated:  { label: 'Escalated',  icon: <FiAlertTriangle />,color: 'yellow'},
};

export default function EmergencyHistory() {
  const [history, setHistory]       = useState([]);
  const [loading, setLoading]       = useState(true);
  const [ratingId, setRatingId]     = useState(null);
  const [rating, setRating]         = useState(5);
  const [review, setReview]         = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function loadHistory() {
      try {
        const data = await getEmergencyHistory();
        setHistory(data.data || []);
      } catch {
        setHistory([]);
      } finally {
        setLoading(false);
      }
    }
    loadHistory();
  }, []);

  async function submitRating(id) {
    setSubmitting(true);
    try {
      await rateEmergency(id, rating, review);
      setHistory((prev) =>
        prev.map((e) => (e._id === id ? { ...e, userRating: rating } : e))
      );
      setRatingId(null);
    } catch {
      // handled silently
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-secondary)' }}>
          Loading history…
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="gn-history-page">

        <div>
          <h1>Emergency History</h1>
          <p>Your past emergency requests and their outcomes.</p>
        </div>

        {history.length === 0 ? (
          <div className="gn-history-empty">
            <FiClock />
            <h3>No emergencies yet</h3>
            <p>Your emergency history will appear here once you send your first SOS.</p>
          </div>
        ) : (
          <div className="gn-history-list">
            {history.map((item) => {
              const config = STATUS_CONFIG[item.status] || STATUS_CONFIG.completed;
              return (
                <div key={item._id} className="gn-card gn-history-card">
                  <div className="gn-history-card-top">
                    <div className="gn-history-category">
                      <FiAlertTriangle />
                      {item.category?.replace(/_/g, ' ')}
                    </div>
                    <span className={`gn-history-status gn-history-status--${config.color}`}>
                      {config.icon} {config.label}
                    </span>
                  </div>

                  <div className="gn-history-meta">
                    <span><FiClock /> {new Date(item.createdAt).toLocaleDateString()}</span>
                    {item.volunteer && (
                      <span>Volunteer: {item.volunteer.name}</span>
                    )}
                  </div>

                  {item.status === 'completed' && !item.userRating && (
                    ratingId === item._id ? (
                      <div className="gn-history-rating">
                        <p>Rate your volunteer:</p>
                        <div className="gn-history-stars">
                          {[1,2,3,4,5].map((s) => (
                            <button
                              key={s}
                              type="button"
                              className={`gn-star-btn ${rating >= s ? 'is-filled' : ''}`}
                              onClick={() => setRating(s)}
                            >
                              <FiStar />
                            </button>
                          ))}
                        </div>
                        <input
                          type="text"
                          className="gn-input"
                          placeholder="Leave a review (optional)"
                          value={review}
                          onChange={(e) => setReview(e.target.value)}
                          style={{ paddingLeft: 14, marginTop: 10 }}
                        />
                        <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
                          <button
                            type="button"
                            className="gn-btn gn-btn-primary"
                            onClick={() => submitRating(item._id)}
                            disabled={submitting}
                          >
                            {submitting ? 'Submitting…' : 'Submit Rating'}
                          </button>
                          <button
                            type="button"
                            className="gn-btn gn-btn-ghost"
                            onClick={() => setRatingId(null)}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        className="gn-btn gn-btn-ghost gn-history-rate-btn"
                        onClick={() => setRatingId(item._id)}
                      >
                        <FiStar /> Rate Volunteer
                      </button>
                    )
                  )}

                  {item.userRating && (
                    <div className="gn-history-rated">
                      {[1,2,3,4,5].map((s) => (
                        <FiStar
                          key={s}
                          style={{ color: s <= item.userRating ? 'var(--gn-warning)' : 'var(--border-subtle)' }}
                        />
                      ))}
                      <span>You rated {item.userRating}/5</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}