import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import './FAQ.css';

const FAQS = [
  {
    q: 'Is my exact location ever shared before a volunteer accepts?',
    a: 'No. Volunteers only see your approximate area, distance, and emergency category until they accept your request. Your exact GPS location unlocks only after acceptance.',
  },
  {
    q: 'How are volunteers verified?',
    a: 'Volunteers submit a government ID, verify their email and phone via OTP, and are manually approved by an administrator before they can receive any requests.',
  },
  {
    q: 'What happens if no volunteer accepts my request?',
    a: 'If no one accepts within 30 seconds, GuardianNet automatically notifies your saved emergency contacts and, where available, security personnel.',
  },
  {
    q: 'Does GuardianNet replace calling emergency services?',
    a: 'No — GuardianNet is a community layer that gets help to you fast. For life-threatening situations, always also contact your local emergency services.',
  },
  {
    q: 'Can I use GuardianNet in languages other than English?',
    a: 'Yes. GuardianNet supports English, Hindi, Marathi, Tamil, Gujarati, Punjabi, Bengali, Telugu, Kannada, and Malayalam.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="gn-section">
      <div className="gn-container gn-faq-wrap">
        <div>
          <span className="gn-eyebrow">FAQ</span>
          <h2 className="gn-section-title">Questions, answered</h2>
          <p className="gn-section-sub">
            Can't find what you're looking for? Reach out from the contact
            section below.
          </p>
        </div>
        <div className="gn-faq-list">
          {FAQS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={item.q} className={`gn-faq-item ${isOpen ? 'is-open' : ''}`}>
                <button
                  type="button"
                  className="gn-faq-question"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                >
                  {item.q}
                  <FiChevronDown className="gn-faq-chevron" />
                </button>
                {isOpen && <p className="gn-faq-answer">{item.a}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}