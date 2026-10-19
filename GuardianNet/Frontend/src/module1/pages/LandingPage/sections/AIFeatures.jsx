import React from 'react';
import { FiCpu, FiShieldOff, FiNavigation, FiMap } from 'react-icons/fi';
import './AIFeatures.css';

const AI_FEATURES = [
  {
    icon: <FiCpu />,
    title: 'AI Emergency Priority Engine',
    desc: 'Ranks incoming requests by category, time of day, and risk signals so the most urgent cases reach volunteers first.',
  },
  {
    icon: <FiNavigation />,
    title: 'Safe Route Recommendation',
    desc: 'Suggests well-lit, well-travelled routes for volunteers and escort requests instead of just the shortest path.',
  },
  {
    icon: <FiShieldOff />,
    title: 'Fake Emergency Detection',
    desc: 'Flags suspicious request patterns for admin review, protecting the trust the whole network depends on.',
  },
  {
    icon: <FiMap />,
    title: 'Community Heat Map',
    desc: 'Aggregated, anonymized emergency trends help volunteers and admins see where help is needed most.',
  },
];

export default function AIFeatures() {
  return (
    <section className="gn-section gn-ai">
      <div className="gn-container gn-ai-grid">
        <div className="gn-ai-intro">
          <span className="gn-eyebrow">Smart Features</span>
          <h2 className="gn-section-title">AI working quietly in the background</h2>
          <p>
            None of this replaces human judgment — it just makes sure the
            right volunteer sees the right request at the right moment.
          </p>
        </div>
        <div className="gn-ai-list">
          {AI_FEATURES.map((f) => (
            <div key={f.title} className="gn-ai-item">
              <span className="gn-ai-icon">{f.icon}</span>
              <div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}