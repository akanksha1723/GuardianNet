// Centralized validation rules. Keeping these in one file means
// Login, Register, and future forms (Contact, Profile, etc.) all
// enforce the exact same rules instead of drifting apart.

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// India-friendly phone check: optional +91/0 prefix, then 10 digits
// starting 6-9 (standard Indian mobile number format).
const PHONE_REGEX = /^(?:\+91[\-\s]?|0)?[6-9]\d{9}$/;

export function validateName(value) {
  if (!value || !value.trim()) return 'Full name is required.';
  if (value.trim().length < 2) return 'Name must be at least 2 characters.';
  if (value.trim().length > 60) return 'Name must be under 60 characters.';
  if (!/^[a-zA-Z\s.'-]+$/.test(value.trim())) {
    return 'Name can only contain letters, spaces, and punctuation.';
  }
  return '';
}

export function validateEmail(value) {
  if (!value || !value.trim()) return 'Email is required.';
  if (!EMAIL_REGEX.test(value.trim())) return 'Enter a valid email address.';
  return '';
}

export function validatePhone(value, { required = false } = {}) {
  if (!value || !value.trim()) {
    return required ? 'Phone number is required.' : '';
  }
  if (!PHONE_REGEX.test(value.trim())) {
    return 'Enter a valid 10-digit mobile number.';
  }
  return '';
}

export function getPasswordStrength(value) {
  if (!value) return { score: 0, label: '' };
  let score = 0;
  if (value.length >= 8) score += 1;
  if (/[A-Z]/.test(value)) score += 1;
  if (/[a-z]/.test(value)) score += 1;
  if (/\d/.test(value)) score += 1;
  if (/[^A-Za-z0-9]/.test(value)) score += 1;

  const labels = ['Very weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very strong'];
  return { score, label: labels[score] };
}

export function validatePassword(value) {
  if (!value) return 'Password is required.';
  if (value.length < 8) return 'Password must be at least 8 characters.';
  if (!/[A-Z]/.test(value)) return 'Include at least one uppercase letter.';
  if (!/[a-z]/.test(value)) return 'Include at least one lowercase letter.';
  if (!/\d/.test(value)) return 'Include at least one number.';
  return '';
}

export function validateConfirmPassword(password, confirmPassword) {
  if (!confirmPassword) return 'Please confirm your password.';
  if (password !== confirmPassword) return 'Passwords do not match.';
  return '';
}

export function validateRequired(value, label = 'This field') {
  if (!value || !String(value).trim()) return `${label} is required.`;
  return '';
}
