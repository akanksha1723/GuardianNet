import React, { useState } from 'react';
import { FiAlertTriangle } from 'react-icons/fi';
import './SOSButton.css';

export default function SOSButton({ onPress, disabled }) {
  const [pressing, setPressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const holdRef                 = React.useRef(null);
  const progressRef             = React.useRef(null);

  function startPress() {
    if (disabled) return;
    setPressing(true);
    setProgress(0);

    let p = 0;
    progressRef.current = setInterval(() => {
      p += 2;
      setProgress(p);
      if (p >= 100) {
        clearInterval(progressRef.current);
        setPressing(false);
        setProgress(0);
        onPress();
      }
    }, 60); // 3 seconds total (100 steps × 60ms ≈ 3s)
  }

  function stopPress() {
    clearInterval(progressRef.current);
    setPressing(false);
    setProgress(0);
  }

  return (
    <div className="gn-sos-btn-wrap">
      <div className="gn-sos-ring-outer" aria-hidden="true" />
      <div className="gn-sos-ring-inner" aria-hidden="true" />

      <button
        type="button"
        className={`gn-sos-main-btn ${pressing ? 'is-pressing' : ''} ${disabled ? 'is-disabled' : ''}`}
        onMouseDown={startPress}
        onMouseUp={stopPress}
        onMouseLeave={stopPress}
        onTouchStart={startPress}
        onTouchEnd={stopPress}
        aria-label="Hold for 3 seconds to send SOS"
        disabled={disabled}
      >
        {/* Progress ring */}
        <svg className="gn-sos-progress" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="54" className="gn-sos-progress-track" />
          <circle
            cx="60" cy="60" r="54"
            className="gn-sos-progress-fill"
            strokeDasharray={`${2 * Math.PI * 54}`}
            strokeDashoffset={`${2 * Math.PI * 54 * (1 - progress / 100)}`}
          />
        </svg>

        <div className="gn-sos-btn-inner">
          <FiAlertTriangle />
          <span>SOS</span>
          <small>{pressing ? 'Hold…' : 'Hold 3s'}</small>
        </div>
      </button>

      <p className="gn-sos-hint">
        Press and hold the SOS button for 3 seconds to send an emergency alert
      </p>
    </div>
  );
}