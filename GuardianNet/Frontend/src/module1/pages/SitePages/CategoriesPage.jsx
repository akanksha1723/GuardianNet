import React from 'react';
import { Link } from 'react-router-dom';
import {
  FiArrowLeft, FiHeart, FiAlertOctagon, FiEye,
  FiTruck, FiTool, FiZap, FiUsers, FiShield,
  FiUserPlus, FiLifeBuoy,
} from 'react-icons/fi';
import './SitePage.css';

const CATEGORIES = [
  {
    icon: <FiHeart />,
    label: 'Medical Emergency',
    color: 'red',
    urgent: true,
    desc: 'Sudden illness, injury, unconsciousness, or any situation requiring immediate medical attention.',
    whenToUse: ['Chest pain or difficulty breathing', 'Unconscious or unresponsive person', 'Severe bleeding or injury', 'Allergic reaction or seizure'],
  },
  {
    icon: <FiAlertOctagon />,
    label: 'Harassment',
    color: 'red',
    urgent: true,
    desc: 'Physical or verbal harassment in public spaces. A verified volunteer will come to your location or stay on call.',
    whenToUse: ['Being followed or threatened', 'Public verbal abuse', 'Physical intimidation', 'Unsafe situation in public transport'],
  },
  {
    icon: <FiEye />,
    label: 'Stalking',
    color: 'red',
    urgent: true,
    desc: 'Someone is following you and you feel unsafe. A volunteer will guide you to safety or accompany you.',
    whenToUse: ['Someone following you on foot', 'A vehicle following your route', 'Repeated unwanted contact', 'Feeling watched or monitored'],
  },
  {
    icon: <FiTruck />,
    label: 'Accident',
    color: 'yellow',
    urgent: true,
    desc: 'Road accident, fall, or any incident where someone is hurt and needs immediate assistance.',
    whenToUse: ['Road accident with injuries', 'Someone fallen and unable to get up', 'Collision needing witnesses', 'First aid needed urgently'],
  },
  {
    icon: <FiTool />,
    label: 'Vehicle Breakdown',
    color: 'blue',
    urgent: false,
    desc: 'Stranded on the road with a broken-down vehicle. A volunteer with mechanical knowledge will assist.',
    whenToUse: ['Car won\'t start', 'Flat tyre on an unsafe road', 'Stranded alone at night', 'Fuel ran out in an unsafe area'],
  },
  {
    icon: <FiZap />,
    label: 'Fire',
    color: 'red',
    urgent: true,
    desc: 'Fire emergency requiring immediate evacuation assistance or firefighting support while official help is on the way.',
    whenToUse: ['Small fire needing immediate response', 'Someone trapped near fire', 'Smoke inhalation danger', 'Building evacuation needed'],
  },
  {
    icon: <FiUsers />,
    label: 'Need Escort',
    color: 'blue',
    urgent: false,
    desc: 'You need someone to walk or travel with you to stay safe. Most used late at night or in unfamiliar areas.',
    whenToUse: ['Walking home late at night', 'Travelling alone in unfamiliar area', 'Feeling unsafe on public transport', 'Medical appointment without company'],
  },
  {
    icon: <FiShield />,
    label: 'Child Safety',
    color: 'red',
    urgent: true,
    desc: 'A child is in danger, lost, or separated from their guardian. Volunteers trained in child safety respond.',
    whenToUse: ['Lost or separated child', 'Child in distress or danger', 'Unsupervised child in unsafe situation', 'Child being approached by strangers'],
  },
  {
    icon: <FiUserPlus />,
    label: 'Elderly Assistance',
    color: 'yellow',
    urgent: false,
    desc: 'An elderly person needs help — medical, mobility, or general assistance in public or at home.',
    whenToUse: ['Elderly person fallen and needs help', 'Senior citizen lost or confused', 'Elderly person needing transportation', 'Medical check-in needed'],
  },
  {
    icon: <FiLifeBuoy />,
    label: 'General SOS',
    color: 'blue',
    urgent: false,
    desc: 'Your situation doesn\'t fit a specific category but you need help. Use this when nothing else applies.',
    whenToUse: ['General distress or fear', 'Need a trusted person nearby', 'Situation is unclear but you feel unsafe', 'Any other emergency not listed above'],
  },
];

const COLOR_MAP = {
  red:    { bg: 'rgba(230,57,70,0.08)',  border: 'rgba(230,57,70,0.2)',  icon: 'rgba(230,57,70,0.12)',  iconColor: '#e63946' },
  yellow: { bg: 'rgba(217,142,28,0.08)', border: 'rgba(217,142,28,0.2)', icon: 'rgba(217,142,28,0.12)', iconColor: '#d98e1c' },
  blue:   { bg: 'rgba(36,81,196,0.06)',  border: 'rgba(36,81,196,0.15)', icon: 'rgba(36,81,196,0.1)',   iconColor: '#2451c4' },
  green:  { bg: 'rgba(31,157,110,0.06)', border: 'rgba(31,157,110,0.15)',icon: 'rgba(31,157,110,0.1)',  iconColor: '#1f9d6e' },
};

export default function CategoriesPage() {
  return (
    <div className="gn-sitepage">
      <div className="gn-sitepage-hero" style={{ background: 'linear-gradient(135deg, #e63946, #0b1330)' }}>
        <div className="gn-container">
          <Link to="/welcome" className="gn-sitepage-back">
            <FiArrowLeft /> Back
          </Link>
          <div className="gn-sitepage-hero-icon" style={{ background: 'rgba(255,255,255,0.15)' }}>
            <FiLifeBuoy />
          </div>
          <h1>Emergency Categories</h1>
          <p>Choose the right category when you send SOS — it helps match the right volunteer to your situation.</p>
        </div>
      </div>

      <div className="gn-container gn-sitepage-body">

        <div className="gn-sitepage-section">
          <p className="gn-sitepage-lead">
            Every category routes your request to volunteers with relevant experience.
            Red dot categories are treated as urgent and escalate faster.
          </p>
        </div>

        <div className="gn-sitepage-categories">
          {CATEGORIES.map((cat) => {
            const c = COLOR_MAP[cat.color];
            return (
              <div
                key={cat.label}
                className="gn-sitepage-category-card"
                style={{ background: c.bg, borderColor: c.border }}
              >
                <div className="gn-sitepage-category-top">
                  <span
                    className="gn-sitepage-category-icon"
                    style={{ background: c.icon, color: c.iconColor }}
                  >
                    {cat.icon}
                  </span>
                  <div>
                    <h3>
                      {cat.label}
                      {cat.urgent && (
                        <span
                          className="gn-sitepage-urgent-badge"
                          style={{ background: c.iconColor }}
                        >
                          Urgent
                        </span>
                      )}
                    </h3>
                    <p>{cat.desc}</p>
                  </div>
                </div>
                <div className="gn-sitepage-when">
                  <strong>Use this when:</strong>
                  <ul>
                    {cat.whenToUse.map((w) => (
                      <li key={w}>{w}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        <div className="gn-sitepage-cta">
          <h2>Set up your account now</h2>
          <p>So it's ready when you need it — emergencies don't give advance notice.</p>
          <div className="gn-sitepage-cta-btns">
            <Link to="/register" className="gn-btn gn-btn-danger gn-btn-lg">Create Account</Link>
            <Link to="/welcome"  className="gn-btn gn-btn-ghost gn-btn-lg">Back to Overview</Link>
          </div>
        </div>

      </div>
    </div>
  );
}