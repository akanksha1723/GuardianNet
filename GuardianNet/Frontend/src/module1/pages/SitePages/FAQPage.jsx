import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiHelpCircle, FiChevronDown } from 'react-icons/fi';
import './SitePage.css';

const FAQS = [
  { q: 'Is my exact location ever shared before a volunteer accepts?', a: 'No. Volunteers only see your approximate area, distance, and emergency category until they accept. Your exact GPS coordinates unlock only after acceptance — and only for that volunteer.' },
  { q: 'How are volunteers verified?', a: 'Volunteers submit a government-issued ID (Aadhar, PAN, Passport, Driving License, or Voter ID), verify their email and phone via OTP, and are manually reviewed and approved by a GuardianNet administrator before they can receive any requests.' },
  { q: 'What happens if no volunteer accepts in 30 seconds?', a: 'GuardianNet automatically and simultaneously sends an SMS to all your saved emergency contacts. At night (10 PM – 6 AM), your highest-priority contact also receives a voice call. Security personnel are also alerted. Official emergency numbers are shown prominently on your screen.' },
  { q: 'Can two contacts both show up thinking they need to help?', a: 'No. All contacts are notified at the same time, but the first one to tap the confirmation link is assigned as the helper. All other contacts instantly receive a "stand down" SMS letting them know someone else is already on the way.' },
  { q: 'Does GuardianNet replace calling official emergency services?', a: 'No — GuardianNet supplements official services. In a life-threatening situation, always also call 100 (Police), 108 (Ambulance), or 112 (Unified). GuardianNet gets community help to you faster while official responders are on the way.' },
  { q: 'What if I have no internet during an emergency?', a: 'GuardianNet detects when you are offline and shows an "Offline SOS" button that opens your native SMS app with a pre-filled emergency message to your saved contacts. No internet needed for this fallback.' },
  { q: 'Can I use GuardianNet in my regional language?', a: 'Yes. GuardianNet supports English, Hindi, Marathi, Tamil, Gujarati, Punjabi, Bengali, Telugu, Kannada, and Malayalam. The full interface — including the SOS flow — is available in all 10 languages.' },
  { q: 'What is the Fake Call feature?', a: 'Fake Call lets you trigger a realistic-looking incoming call on your screen — with a name and number — so you can safely excuse yourself from a threatening or uncomfortable situation without alerting the other person.' },
  { q: 'How does Shake to SOS work?', a: 'If you enable Shake to SOS in settings, shaking your phone firmly three times triggers an emergency SOS automatically — even without opening the app. This is designed for situations where you cannot safely interact with your screen.' },
  { q: 'Is the platform safe for volunteers?', a: 'Yes. Volunteers only see the approximate area before accepting — protecting them from making decisions based on specific addresses in advance. After accepting, they have full navigation. Volunteers can also reject any request they feel unsafe about.' },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="gn-sitepage">
      <div className="gn-sitepage-hero" style={{ background: 'linear-gradient(135deg, #15224a, #2451c4)' }}>
        <div className="gn-container">
          <Link to="/welcome" className="gn-sitepage-back">
            <FiArrowLeft /> Back
          </Link>
          <div className="gn-sitepage-hero-icon" style={{ background: 'rgba(255,255,255,0.15)' }}>
            <FiHelpCircle />
          </div>
          <h1>Frequently Asked Questions</h1>
          <p>Everything you need to know about how GuardianNet works.</p>
        </div>
      </div>

      <div className="gn-container gn-sitepage-body">

        <div className="gn-sitepage-faq-list">
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={item.q}
                className={`gn-sitepage-faq-item ${isOpen ? 'is-open' : ''}`}
              >
                <button
                  type="button"
                  className="gn-sitepage-faq-q"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span>{item.q}</span>
                  <FiChevronDown className="gn-sitepage-faq-chevron" />
                </button>
                {isOpen && (
                  <p className="gn-sitepage-faq-a">{item.a}</p>
                )}
              </div>
            );
          })}
        </div>

        <div className="gn-sitepage-cta">
          <h2>Still have questions?</h2>
          <p>Contact the GuardianNet team — we read every message.</p>
          <div className="gn-sitepage-cta-btns">
            <Link to="/#contact"  className="gn-btn gn-btn-primary gn-btn-lg">Contact Us</Link>
            <Link to="/welcome"   className="gn-btn gn-btn-ghost gn-btn-lg">Back to Overview</Link>
          </div>
        </div>

      </div>
    </div>
  );
}