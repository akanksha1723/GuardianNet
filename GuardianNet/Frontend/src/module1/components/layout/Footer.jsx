import React from 'react';
import { Link } from 'react-router-dom';
import { FiShield, FiMail, FiPhone, FiMapPin, FiGithub, FiTwitter, FiLinkedin } from 'react-icons/fi';
import './Footer.css';

const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="gn-footer">
      <div className="gn-container gn-footer-top">
        <div className="gn-footer-brand">
          <div className="gn-brand">
            <span className="gn-brand-icon">
              <FiShield />
            </span>
            <span className="gn-brand-text">
              Guardian<span className="gn-brand-accent">Net</span>
            </span>
          </div>
          <p className="gn-footer-tagline">
            A community emergency response network connecting people in danger
            with verified volunteers nearby, in seconds.
          </p>
          <div className="gn-footer-socials">
            <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub">
              <FiGithub />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
              <FiTwitter />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <FiLinkedin />
            </a>
          </div>
        </div>

        <div className="gn-footer-col">
          <h4>Platform</h4>
          <ul>
            <li><a href="#features">Features</a></li>
            <li><a href="#how-it-works">How It Works</a></li>
            <li><a href="#categories">Emergency Categories</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
        </div>

        <div className="gn-footer-col">
          <h4>Account</h4>
          <ul>
            <li><Link to="/login">Log In</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/register">Become a Volunteer</Link></li>
          </ul>
        </div>

        <div className="gn-footer-col">
          <h4>Contact</h4>
          <ul className="gn-footer-contact">
            <li><FiMail /> help@guardiannet.app</li>
            <li><FiPhone /> +91 1800-000-1111</li>
            <li><FiMapPin /> Operating across India</li>
          </ul>
        </div>
      </div>

      <div className="gn-footer-disclaimer gn-container">
        <p>
          GuardianNet supplements — and never replaces — official emergency
          services. In a life-threatening situation, contact local emergency
          services immediately.
        </p>
      </div>

      <div className="gn-footer-bottom gn-container">
        <p>© {YEAR} GuardianNet. All rights reserved.</p>
        <div className="gn-footer-bottom-links">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
