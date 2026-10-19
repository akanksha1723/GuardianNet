import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiAlertCircle } from 'react-icons/fi';
import AuthLayout from './AuthLayout';
import FormField from '../../components/common/FormField';
import { useForm } from '../../hooks/useForm';
import { validateEmail, validateRequired } from '../../utils/validators';
import { useAuth } from '../../contexts/AuthContext';
import './Auth.css';

const schema = {
  email: validateEmail,
  password: (value) => validateRequired(value, 'Password'),
};

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    values,
    errors,
    touched,
    submitting,
    setSubmitting,
    handleChange,
    handleBlur,
    validateAll,
  } = useForm({ email: '', password: '', remember: false }, schema);

  async function handleSubmit(e) {
    e.preventDefault();
    setServerError('');
    if (!validateAll()) return;

    setSubmitting(true);
    try {
      await login({ email: values.email, password: values.password });
      const redirectTo = location.state?.from || '/dashboard';
      navigate(redirectTo, { replace: true });
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
      panelTitle="Help is closer than you think."
      panelSubtitle="Log in to request help, track your volunteers, and manage your emergency contacts."
    >
      <div className="gn-auth-form">
        <h1 className="gn-auth-title">Welcome back</h1>
        <p className="gn-auth-subtitle">Log in to your GuardianNet account.</p>

        {serverError && (
          <div className="gn-auth-alert" role="alert">
            <FiAlertCircle /> {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
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
            placeholder="Enter your password"
            icon={<FiLock />}
            autoComplete="current-password"
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

          <div className="gn-auth-row">
            <label className="gn-checkbox">
              <input
                type="checkbox"
                name="remember"
                checked={values.remember}
                onChange={handleChange}
              />
              Remember me
            </label>
          </div>

          <button type="submit" className="gn-btn gn-btn-primary gn-btn-block gn-btn-lg" disabled={submitting}>
            {submitting ? 'Logging in…' : <>Log In <FiArrowRight /></>}
          </button>
        </form>

        <p className="gn-auth-switch">
          Don't have an account? <Link to="/register">Create one</Link>
        </p>
      </div>
    </AuthLayout>
  );
}