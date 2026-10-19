import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCheckCircle, FiMapPin, FiClock } from 'react-icons/fi';
import './Hero.css';

export default function Hero() {
  return (
    <section id="home" className="gn-hero">
      <div className="gn-hero-glow" aria-hidden="true" />
      <div className="gn-container gn-hero-grid">

        <div className="gn-hero-copy">
          <span className="gn-eyebrow">AI-Powered Community Safety Network</span>
          <h1 className="gn-hero-title">
            When you need help,<br />
            <span className="gn-hero-title-accent">your neighbors hear it first.</span>
          </h1>
          <p className="gn-hero-sub">
            GuardianNet connects you to verified volunteers nearby in seconds —
            with live tracking, in-app chat and calling, and automatic
            escalation if no one responds. Privacy-first, built for real
            emergencies.
          </p>
          <div className="gn-hero-cta">
            <Link to="/register" className="gn-btn gn-btn-danger gn-btn-lg">
              Get Protected <FiArrowRight />
            </Link>
            <Link to="/register" className="gn-btn gn-btn-ghost gn-btn-lg">
              Become a Volunteer
            </Link>
          </div>
          <div className="gn-hero-trust">
            <span><FiCheckCircle /> ID-verified volunteers</span>
            <span><FiCheckCircle /> Location hidden until accepted</span>
            <span><FiCheckCircle /> 24/7 monitoring</span>
          </div>
        </div>

        <div className="gn-hero-visual">
          <div className="gn-hero-radar" aria-hidden="true">
            <span className="gn-hero-radar-ring r1" />
            <span className="gn-hero-radar-ring r2" />
            <span className="gn-hero-radar-ring r3" />
          </div>
          <div className="gn-card gn-glass gn-hero-card">
            <div className="gn-hero-card-header">
              <span className="gn-hero-card-dot" />
              Live Request
            </div>
            <h3>Need Escort</h3>
            <p className="gn-hero-card-meta">
              <FiMapPin /> ~350m away · Approximate area only
            </p>
            <div className="gn-hero-card-status">
              <FiClock /> Matching nearby verified volunteers…
            </div>
            <div className="gn-hero-card-footer">
              <div className="gn-hero-avatar-stack">
                <span className="gn-avatar" />
                <span className="gn-avatar" />
                <span className="gn-avatar" />
              </div>
              <span className="gn-hero-card-footer-text">3 volunteers nearby</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}