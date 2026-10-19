import React from 'react';
import { FiPhone, FiPhoneOff, FiPhoneIncoming } from 'react-icons/fi';
import './FakeCall.css';

export default function FakeCall({
  isRinging,
  isOnCall,
  caller,
  callDuration,
  onAnswer,
  onEnd,
  onTrigger,
}) {
  // Trigger button — shown in the SOS page for quick access
  if (!isRinging && !isOnCall) {
    return (
      <button
        type="button"
        className="gn-fake-call-trigger"
        onClick={() => onTrigger(3)}
        title="Trigger a fake incoming call to help you escape a situation"
      >
        <FiPhoneIncoming />
        Fake Call
      </button>
    );
  }

  // Ringing screen
  if (isRinging) {
    return (
      <div className="gn-fake-call-screen">
        <div className="gn-fake-call-overlay" />
        <div className="gn-fake-call-modal">
          <div className="gn-fake-caller-avatar">
            {caller?.name?.charAt(0)}
          </div>
          <h2 className="gn-fake-caller-name">{caller?.name}</h2>
          <p className="gn-fake-caller-number">{caller?.number}</p>
          <p className="gn-fake-call-status">Incoming Call…</p>
          <div className="gn-fake-call-actions">
            <button
              type="button"
              className="gn-fake-call-btn gn-fake-call-btn--decline"
              onClick={onEnd}
            >
              <FiPhoneOff />
              Decline
            </button>
            <button
              type="button"
              className="gn-fake-call-btn gn-fake-call-btn--answer"
              onClick={onAnswer}
            >
              <FiPhone />
              Answer
            </button>
          </div>
        </div>
      </div>
    );
  }

  // On-call screen
  return (
    <div className="gn-fake-call-screen">
      <div className="gn-fake-call-overlay" />
      <div className="gn-fake-call-modal">
        <div className="gn-fake-caller-avatar is-active">
          {caller?.name?.charAt(0)}
        </div>
        <h2 className="gn-fake-caller-name">{caller?.name}</h2>
        <p className="gn-fake-caller-number">{caller?.number}</p>
        <p className="gn-fake-call-duration">{callDuration}</p>
        <button
          type="button"
          className="gn-fake-call-btn gn-fake-call-btn--end"
          onClick={onEnd}
        >
          <FiPhoneOff />
          End Call
        </button>
      </div>
    </div>
  );
}