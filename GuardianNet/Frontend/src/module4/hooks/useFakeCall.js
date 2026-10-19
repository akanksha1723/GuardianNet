import { useState, useRef, useCallback } from 'react';

const FAKE_CALLERS = [
  { name: 'Mom',        number: '+91 98765 43210' },
  { name: 'Dad',        number: '+91 87654 32109' },
  { name: 'Priya',      number: '+91 76543 21098' },
  { name: 'Rahul',      number: '+91 99887 76655' },
  { name: 'Office',     number: '+91 11 2233 4455' },
];

export function useFakeCall() {
  const [isRinging, setIsRinging]   = useState(false);
  const [caller, setCaller]         = useState(null);
  const [isOnCall, setIsOnCall]     = useState(false);
  const [callDuration, setDuration] = useState(0);
  const timerRef                    = useRef(null);
  const durationRef                 = useRef(null);

  const triggerFakeCall = useCallback((delaySeconds = 3) => {
    const randomCaller = FAKE_CALLERS[Math.floor(Math.random() * FAKE_CALLERS.length)];
    setCaller(randomCaller);

    // Ring after delay
    timerRef.current = setTimeout(() => {
      setIsRinging(true);
    }, delaySeconds * 1000);
  }, []);

  const answerCall = useCallback(() => {
    setIsRinging(false);
    setIsOnCall(true);
    setDuration(0);

    // Start call duration timer
    durationRef.current = setInterval(() => {
      setDuration((prev) => prev + 1);
    }, 1000);
  }, []);

  const endCall = useCallback(() => {
    setIsRinging(false);
    setIsOnCall(false);
    setDuration(0);
    setCaller(null);
    clearTimeout(timerRef.current);
    clearInterval(durationRef.current);
  }, []);

  function formatDuration(seconds) {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  return {
    isRinging,
    isOnCall,
    caller,
    callDuration: formatDuration(callDuration),
    triggerFakeCall,
    answerCall,
    endCall,
  };
}