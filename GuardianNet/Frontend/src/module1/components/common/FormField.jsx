import React from 'react';

/**
 * Reusable labeled input with a leading icon and inline validation error.
 * Used by Login, Register, and any future form (Contact, Profile, etc.)
 * so error styling/behavior is consistent app-wide.
 */
export default function FormField({
  label,
  name,
  type = 'text',
  icon,
  value,
  onChange,
  onBlur,
  error,
  touched,
  placeholder,
  autoComplete,
  rightElement,
  helperText,
}) {
  const showError = touched && error;

  return (
    <div className="gn-field">
      <label htmlFor={name}>{label}</label>
      <div className="gn-input-wrap">
        {icon}
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`gn-input${showError ? ' gn-input-error' : ''}`}
          aria-invalid={Boolean(showError)}
          aria-describedby={showError ? `${name}-error` : undefined}
        />
        {rightElement}
      </div>
      {showError && (
        <span id={`${name}-error`} className="gn-error-text" role="alert">
          {error}
        </span>
      )}
      {!showError && helperText && <span className="gn-helper-text">{helperText}</span>}
    </div>
  );
}
