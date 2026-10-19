import { useEffect, useCallback } from 'react';

/**
 * Detects phone shake using the DeviceMotionEvent API.
 * When a shake is detected, calls the onShake callback.
 * Threshold controls how hard the shake needs to be (default 25).
 */
export function useShakeDetector({ onShake, threshold = 25, enabled = true }) {
  const handleMotion = useCallback(
    (event) => {
      if (!enabled) return;

      const acc = event.accelerationIncludingGravity;
      if (!acc) return;

      const total = Math.sqrt(
        (acc.x || 0) ** 2 +
        (acc.y || 0) ** 2 +
        (acc.z || 0) ** 2
      );

      if (total > threshold) {
        onShake();
      }
    },
    [enabled, onShake, threshold]
  );

  useEffect(() => {
    if (!enabled) return;
    if (!window.DeviceMotionEvent) return;

    // iOS 13+ requires permission
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
      DeviceMotionEvent.requestPermission()
        .then((permission) => {
          if (permission === 'granted') {
            window.addEventListener('devicemotion', handleMotion);
          }
        })
        .catch(console.error);
    } else {
      window.addEventListener('devicemotion', handleMotion);
    }

    return () => {
      window.removeEventListener('devicemotion', handleMotion);
    };
  }, [enabled, handleMotion]);
}