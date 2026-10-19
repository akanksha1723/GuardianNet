import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiShield, FiAlertTriangle, FiUsers, FiHome, FiTruck, FiHeart } from 'react-icons/fi';
import './SitePage.css';

const TIPS = {
  general: {
    label: 'General Safety',
    icon: <FiShield />,
    tips: [
      { title: 'Share your live location', body: 'Always share your live location with at least one trusted contact when going somewhere unfamiliar or travelling late.' },
      { title: 'Keep your phone charged', body: 'A dead phone cannot send SOS. Keep a power bank handy, especially during long trips or late-night outings.' },
      { title: 'Save emergency numbers', body: 'Save Police (100), Ambulance (108), Fire (101), and Women Helpline (1091) in your phone. Also save GuardianNet emergency contacts.' },
      { title: 'Trust your instincts', body: 'If something feels wrong, it probably is. Remove yourself from the situation and send SOS immediately — do not wait.' },
      { title: 'Tell someone your plan', body: 'Always tell someone where you are going, how long you will be, and when to expect you back.' },
    ],
  },
  public: {
    label: 'Public Spaces',
    icon: <FiUsers />,
    tips: [
      { title: 'Stay in well-lit areas', body: 'At night, walk through well-lit, populated streets even if the route is longer. Avoid shortcuts through dark lanes.' },
      { title: 'Be aware of your surroundings', body: 'Keep headphones at a low volume or use only one earbud so you can hear what is happening around you.' },
      { title: 'Use the Escort feature', body: 'GuardianNet\'s Escort category connects you with a verified volunteer who will accompany you or stay on call while you travel.' },
      { title: 'Fake call trick', body: 'Use GuardianNet\'s Fake Call feature to simulate an incoming call, giving you a reason to leave an uncomfortable situation.' },
      { title: 'Note landmarks and exits', body: 'When entering any space, identify the nearest exits. In a crowded place, know where you can move to if needed.' },
    ],
  },
  home: {
    label: 'At Home',
    icon: <FiHome />,
    tips: [
      { title: 'Keep doors locked', body: 'Always lock your door, even when at home. Use a chain lock or deadbolt for extra security.' },
      { title: 'Do not open for strangers', body: 'Verify the identity of visitors before opening the door. Use a peephole or video doorbell.' },
      { title: 'Emergency contact list', body: 'Keep a physical list of emergency numbers and GuardianNet contacts near your landline or on the refrigerator.' },
      { title: 'Smoke and gas detectors', body: 'Install smoke and carbon monoxide detectors in your home and test them monthly.' },
      { title: 'First aid kit', body: 'Keep a basic first aid kit at home. Know how to use it for common injuries while waiting for professional help.' },
    ],
  },
  travel: {
    label: 'Travelling',
    icon: <FiTruck />,
    tips: [
      { title: 'Use Journey Tracker', body: 'GuardianNet\'s Journey Tracker shares your live route with trusted contacts and alerts them if you deviate.' },
      { title: 'Prefer verified rides', body: 'Use registered taxi or ride-hailing services. Share the driver details and your live location with someone.' },
      { title: 'Avoid sharing personal plans', body: 'Do not announce your travel plans publicly on social media — it can make you a target.' },
      { title: 'Keep documents safe', body: 'Keep a digital copy of all important documents (ID, tickets) in a secure cloud storage accessible from your phone.' },
      { title: 'Local emergency numbers', body: 'GuardianNet shows state-specific emergency numbers. Know the local police station number of areas you travel to.' },
    ],
  },
  medical: {
    label: 'Medical',
    icon: <FiHeart />,
    tips: [
      { title: 'Medical profile in GuardianNet', body: 'Set up your medical profile with blood group, allergies, and medications. Volunteers can share this with paramedics in an emergency.' },
      { title: 'CPR basics', body: 'Learn basic CPR. It takes 20 minutes to learn and can save a life in the time it takes for an ambulance to arrive.' },
      { title: 'Choking response', body: 'Learn the Heimlich manoeuvre. Choking is silent — the person cannot call for help.' },
      { title: 'Recognise stroke signs', body: 'Face drooping, arm weakness, speech difficulty — call for help immediately. Every minute matters in a stroke.' },
      { title: 'Do not move injured people', body: 'Unless there is immediate danger (fire, traffic), do not move someone who may have a spinal injury. Wait for professional help.' },
    ],
  },
};

export default function SafetyTipsPage() {
  const [active, setActive] = useState('general');
  const section = TIPS[active];

  return (
    <div className="gn-sitepage">
      <div className="gn-sitepage-hero" style={{ background: 'linear-gradient(135deg, #1f9d6e, #15224a)' }}>
        <div className="gn-container">
          <Link to="/welcome" className="gn-sitepage-back">
            <FiArrowLeft /> Back
          </Link>
          <div className="gn-sitepage-hero-icon" style={{ background: 'rgba(255,255,255,0.15)' }}>
            <FiAlertTriangle />
          </div>
          <h1>Safety Tips</h1>
          <p>Practical advice to keep you and your community safer — before, during, and after an emergency.</p>
        </div>
      </div>

      <div className="gn-container gn-sitepage-body">

        <div className="gn-sitepage-tabs">
          {Object.entries(TIPS).map(([key, val]) => (
            <button
              key={key}
              type="button"
              className={`gn-sitepage-tab ${active === key ? 'is-active' : ''}`}
              onClick={() => setActive(key)}
            >
              {val.label}
            </button>
          ))}
        </div>

        <div className="gn-sitepage-tips-list">
          {section.tips.map((tip, i) => (
            <div key={tip.title} className="gn-sitepage-tip-card">
              <div className="gn-sitepage-tip-num gn-mono">{String(i + 1).padStart(2, '0')}</div>
              <div>
                <h3>{tip.title}</h3>
                <p>{tip.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="gn-sitepage-cta">
          <h2>Be prepared before you need it</h2>
          <p>Set up GuardianNet now — add your emergency contacts and medical profile.</p>
          <div className="gn-sitepage-cta-btns">
            <Link to="/register" className="gn-btn gn-btn-primary gn-btn-lg">Get Started</Link>
            <Link to="/welcome"  className="gn-btn gn-btn-ghost gn-btn-lg">Back to Overview</Link>
          </div>
        </div>

      </div>
    </div>
  );
}