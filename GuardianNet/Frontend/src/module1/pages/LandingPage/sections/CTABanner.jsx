import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import './CTABanner.css';

export default function CTABanner() {
  return (
    <section className="gn-cta">
      <div className="gn-container gn-cta-inner gn-glass">
        <div>
          <h2>Join the network before you need it.</h2>
          <p>
            It takes two minutes to register. Verification for volunteers
            takes a little longer — for good reason.
          </p>
        </div>
        <Link to="/register" className="gn-btn gn-btn-danger gn-btn-lg">
          Create Free Account <FiArrowRight />
        </Link>
      </div>
    </section>
  );
}