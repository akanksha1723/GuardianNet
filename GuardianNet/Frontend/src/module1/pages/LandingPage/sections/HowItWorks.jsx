import React from 'react';
import './HowItWorks.css';

const STEPS = [
  { n: '01', title: 'Press Emergency SOS',      desc: 'Open GuardianNet and choose your emergency category in one tap.' },
  { n: '02', title: 'We find nearby volunteers', desc: 'Verified volunteers nearby get notified instantly — your exact location stays hidden.' },
  { n: '03', title: 'A volunteer accepts',       desc: 'Your exact GPS location unlocks, live tracking starts, and chat opens automatically.' },
  { n: '04', title: 'Stay connected',            desc: 'Chat or call your volunteer, watch their live ETA, and get help in person.' },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="gn-section gn-howitworks">
      <div className="gn-container">
        <span className="gn-eyebrow">How It Works</span>
        <h2 className="gn-section-title">From SOS to help, in four steps</h2>
        <p className="gn-section-sub">
          This is a real sequence — each step unlocks the next, and nothing
          skips ahead of your privacy.
        </p>
        <div className="gn-steps">
          {STEPS.map((step, i) => (
            <div key={step.n} className="gn-step">
              <div className="gn-step-marker">
                <span className="gn-mono">{step.n}</span>
              </div>
              {i < STEPS.length - 1 && (
                <span className="gn-step-line" aria-hidden="true" />
              )}
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}