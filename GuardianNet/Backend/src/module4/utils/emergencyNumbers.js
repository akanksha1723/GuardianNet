// Official emergency numbers by Indian state.
// Shown to the user during escalation so they can
// call official services alongside the GuardianNet alert.

const EMERGENCY_NUMBERS = {
  default: {
    police:    '100',
    ambulance: '108',
    fire:      '101',
    women:     '1091',
    child:     '1098',
    disaster:  '108',
    unified:   '112',
  },

  states: {
    'Maharashtra': {
      police:    '100',
      ambulance: '108',
      fire:      '101',
      women:     '103',
      child:     '1098',
      unified:   '112',
      local:     'Mumbai Police: 022-22621855',
    },
    'Delhi': {
      police:    '100',
      ambulance: '102',
      fire:      '101',
      women:     '181',
      child:     '1098',
      unified:   '112',
      local:     'Delhi Police: 011-23490000',
    },
    'Karnataka': {
      police:    '100',
      ambulance: '108',
      fire:      '101',
      women:     '1091',
      child:     '1098',
      unified:   '112',
      local:     'Bengaluru Police: 080-22943311',
    },
    'Tamil Nadu': {
      police:    '100',
      ambulance: '108',
      fire:      '101',
      women:     '181',
      child:     '1098',
      unified:   '112',
      local:     'Chennai Police: 044-28447777',
    },
    'Uttar Pradesh': {
      police:    '100',
      ambulance: '108',
      fire:      '101',
      women:     '1090',
      child:     '1098',
      unified:   '112',
      local:     'UP Police: 0522-2613430',
    },
    'West Bengal': {
      police:    '100',
      ambulance: '108',
      fire:      '101',
      women:     '1091',
      child:     '1098',
      unified:   '112',
      local:     'Kolkata Police: 033-22141212',
    },
    'Gujarat': {
      police:    '100',
      ambulance: '108',
      fire:      '101',
      women:     '181',
      child:     '1098',
      unified:   '112',
    },
    'Rajasthan': {
      police:    '100',
      ambulance: '108',
      fire:      '101',
      women:     '1091',
      child:     '1098',
      unified:   '112',
    },
    'Punjab': {
      police:    '100',
      ambulance: '108',
      fire:      '101',
      women:     '1091',
      child:     '1098',
      unified:   '112',
    },
    'Kerala': {
      police:    '100',
      ambulance: '108',
      fire:      '101',
      women:     '1091',
      child:     '1098',
      unified:   '112',
      local:     'Kerala Police: 0471-2722299',
    },
  },
};

// Returns emergency numbers for a given state.
// Falls back to default national numbers if state not found.
export function getEmergencyNumbers(state) {
  const stateNumbers = EMERGENCY_NUMBERS.states[state];
  return {
    ...EMERGENCY_NUMBERS.default,
    ...(stateNumbers || {}),
  };
}

// Returns all state names we have specific numbers for
export function getSupportedStates() {
  return Object.keys(EMERGENCY_NUMBERS.states);
}

export default EMERGENCY_NUMBERS;