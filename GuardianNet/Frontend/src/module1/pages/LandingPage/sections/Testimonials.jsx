import React from 'react';
import { FiStar } from 'react-icons/fi';
import './Testimonials.css';

const TESTIMONIALS = [
  {
    name: 'Ananya R.',
    role: 'Registered User · Pune',
    quote: 'My scooter broke down late at night on an empty road. A volunteer accepted within a minute and stayed on call until I reached home safely.',
  },
  {
    name: 'Rohit Mehta',
    role: 'Verified Volunteer · Bengaluru',
    quote: 'The verification process felt thorough, not tedious. I like that I only see distance and category before I accept a request — it keeps things fair.',
  },
  {
    name: 'Sunita Iyer',
    role: 'Registered User · Chennai',
    quote: 'I use the escort feature whenever I walk home from late shifts. Knowing someone verified is tracking along with me changes how safe I feel.',
  },
];

export default function Testimonials() {
  return (
    <section className="gn-section gn-testimonials">
      <div className="gn-container">
        <span className="gn-eyebrow">Community Voices</span>
        <h2 className="gn-section-title">Trusted by people who needed it most</h2>
        <div className="gn-testimonial-grid">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="gn-card gn-testimonial-card">
              <div className="gn-testimonial-stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FiStar key={i} />
                ))}
              </div>
              <p className="gn-testimonial-quote">"{t.quote}"</p>
              <div className="gn-testimonial-author">
                <span className="gn-avatar gn-avatar-lg" />
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}