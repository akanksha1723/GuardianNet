import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiUser,
  FiMail,
  FiPhone,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiAlertCircle,
  FiShield,
  FiUserCheck,
} from 'react-icons/fi';
import AuthLayout from './AuthLayout';
import FormField from '../../components/common/FormField';
import { useForm } from '../../hooks/useForm';
import {
  validateName,
  validateEmail,
  validatePhone,
  validatePassword,
  validateConfirmPassword,
  getPasswordStrength,
} from '../../utils/validators';
import { useAuth } from '../../contexts/AuthContext';
import './Auth.css';

const schema = {
  name: validateName,
  email: validateEmail,
  phone: (value) => validatePhone(value, { required: true }),
  password: validatePassword,
  confirmPassword: (value, all) => validateConfirmPassword(all.password, value),
  agree: (value) => (value ? '' : 'You must accept the Terms & Privacy Policy.'),
};

const STRENGTH_COLORS = ['#e63946', '#e63946', '#d98e1c', '#2451c4', '#1f9d6e', '#1f9d6e'];

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [serverError, setServerError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const {
    values,
    errors,
    touched,
    submitting,
    setSubmitting,
    handleChange,
    handleBlur,
    validateAll,
    setValues,
  } = useForm(
    {
      role: 'user',
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      agree: false,
    },
    schema
  );

  const strength = getPasswordStrength(values.password);

  function selectRole(role) {
    setValues((prev) => ({ ...prev, role }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setServerError('');
    if (!validateAll()) return;

    setSubmitting(true);
    try {
      await register({
        name: values.name,
        email: values.email,
        phone: values.phone,
        password: values.password,
        role: values.role,
      });
      navigate('/dashboard', { replace: true });
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        'We could not reach the server. The backend module for this is built later — try again once it is live.';
      setServerError(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthLayout
      panelTitle="Be the help someone is hoping for."
      panelSubtitle="Register as a user to request help, or apply as a volunteer to start responding to nearby emergencies."
    >
      <div className="gn-auth-form gn-auth-form-wide">
        <h1 className="gn-auth-title">Create your account</h1>
        <p className="gn-auth-subtitle">It takes about two minutes.</p>

        {serverError && (
          <div className="gn-auth-alert" role="alert">
            <FiAlertCircle /> {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="gn-role-select" role="radiogroup" aria-label="Account type">
            <button
              type="button"
              role="radio"
              aria-checked={values.role === 'user'}
              className={`gn-role-card ${values.role === 'user' ? 'is-selected' : ''}`}
              onClick={() => selectRole('user')}
            >
              <FiUserCheck />
              <span>Registered User</span>
              <small>I want to request help</small>
            </button>
            <button
              type="button"
              role="radio"
              aria-checked={values.role === 'volunteer'}
              className={`gn-role-card ${values.role === 'volunteer' ? 'is-selected' : ''}`}
              onClick={() => selectRole('volunteer')}
            >
              <FiShield />
              <span>Volunteer</span>
              <small>I want to help others (ID verification required)</small>
            </button>
          </div>

          <div className="gn-form-grid">
            <FormField
              label="Full Name"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.name}
              touched={touched.name}
              placeholder="Jordan Lee"
              icon={<FiUser />}
              autoComplete="name"
            />
            <FormField
              label="Phone Number"
              name="phone"
              type="tel"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.phone}
              touched={touched.phone}
              placeholder="98765 43210"
              icon={<FiPhone />}
              autoComplete="tel"
            />
          </div>

          <FormField
            label="Email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email}
            touched={touched.email}
            placeholder="you@example.com"
            icon={<FiMail />}
            autoComplete="email"
          />

          <FormField
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.password}
            touched={touched.password}
            placeholder="At least 8 characters"
            icon={<FiLock />}
            autoComplete="new-password"
            rightElement={
              <button
                type="button"
                className="gn-input-toggle"
                onClick={() => setShowPassword((p) => !p)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            }
          />

          {values.password && (
            <div className="gn-strength-meter" aria-hidden="true">
              <div className="gn-strength-track">
                <div
                  className="gn-strength-fill"
                  style={{
                    width: `${(strength.score / 5) * 100}%`,
                    backgroundColor: STRENGTH_COLORS[strength.score],
                  }}
                />
              </div>
              <span className="gn-strength-label">{strength.label}</span>
            </div>
          )}

          <FormField
            label="Confirm Password"
            name="confirmPassword"
            type={showConfirm ? 'text' : 'password'}
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.confirmPassword}
            touched={touched.confirmPassword}
            placeholder="Re-enter your password"
            icon={<FiLock />}
            autoComplete="new-password"
            rightElement={
              <button
                type="button"
                className="gn-input-toggle"
                onClick={() => setShowConfirm((p) => !p)}
                aria-label={showConfirm ? 'Hide password' : 'Show password'}
              >
                {showConfirm ? <FiEyeOff /> : <FiEye />}
              </button>
            }
          />

          <label className="gn-checkbox gn-checkbox-terms">
            <input type="checkbox" name="agree" checked={values.agree} onChange={handleChange} onBlur={handleBlur} />
            I agree to the <a href="#terms">Terms of Service</a> and <a href="#privacy">Privacy Policy</a>.
          </label>
          {touched.agree && errors.agree && (
            <span className="gn-error-text" role="alert">{errors.agree}</span>
          )}

          <button type="submit" className="gn-btn gn-btn-primary gn-btn-block gn-btn-lg" disabled={submitting}>
            {submitting ? 'Creating account…' : <>Create Account <FiArrowRight /></>}
          </button>
        </form>

        <p className="gn-auth-switch">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </AuthLayout>
  );
}