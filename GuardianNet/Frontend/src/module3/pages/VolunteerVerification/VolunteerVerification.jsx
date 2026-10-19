import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiShield,
  FiUpload,
  FiCheckCircle,
  FiAlertCircle,
  FiUser,
  FiFileText,
} from 'react-icons/fi';
import DashboardLayout from '../../../module2/components/DashboardLayout';
import { applyAsVolunteer } from '../../services/volunteerService';
import { useForm } from '../../../module1/hooks/useForm';
import { validateRequired } from '../../../module1/utils/validators';
import FormField from '../../../module1/components/common/FormField';

const schema = {
  governmentIdType:   (v) => validateRequired(v, 'ID type'),
  governmentIdNumber: (v) => validateRequired(v, 'ID number'),
};

const ID_TYPES = [
  { value: 'aadhar',           label: 'Aadhar Card' },
  { value: 'pan',              label: 'PAN Card' },
  { value: 'passport',         label: 'Passport' },
  { value: 'driving_license',  label: 'Driving License' },
  { value: 'voter_id',         label: 'Voter ID' },
];

const CATEGORIES = [
  { value: 'medical',           label: 'Medical Emergency' },
  { value: 'harassment',        label: 'Harassment' },
  { value: 'stalking',          label: 'Stalking' },
  { value: 'accident',          label: 'Accident' },
  { value: 'vehicle_breakdown', label: 'Vehicle Breakdown' },
  { value: 'fire',              label: 'Fire' },
  { value: 'escort',            label: 'Need Escort' },
  { value: 'child_safety',      label: 'Child Safety' },
  { value: 'elderly',           label: 'Elderly Assistance' },
  { value: 'general',           label: 'General SOS' },
];

export default function VolunteerVerification() {
  const navigate = useNavigate();
  const [serverError, setServerError]     = useState('');
  const [submitted, setSubmitted]         = useState(false);
  const [selectedCategories, setSelected] = useState(['general']);

  const {
    values,
    errors,
    touched,
    submitting,
    setSubmitting,
    handleChange,
    handleBlur,
    validateAll,
  } = useForm(
    { governmentIdType: '', governmentIdNumber: '', bio: '' },
    schema
  );

  function toggleCategory(cat) {
    setSelected((prev) =>
      prev.includes(cat)
        ? prev.filter((c) => c !== cat)
        : [...prev, cat]
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setServerError('');
    if (!validateAll()) return;

    setSubmitting(true);
    try {
      await applyAsVolunteer({
        governmentIdType:    values.governmentIdType,
        governmentIdNumber:  values.governmentIdNumber,
        bio:                 values.bio,
        availableCategories: selectedCategories,
      });
      setSubmitted(true);
    } catch (err) {
      setServerError(
        err?.response?.data?.message || 'Could not submit application. Try again.'
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <DashboardLayout>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '60px 24px',
          gap: '16px',
        }}>
          <FiCheckCircle style={{ fontSize: '4rem', color: 'var(--gn-success)' }} />
          <h2>Application Submitted!</h2>
          <p style={{ maxWidth: 480 }}>
            Your verification application has been submitted successfully.
            Admin will review your documents within 24-48 hours.
          </p>
          <button
            type="button"
            className="gn-btn gn-btn-primary"
            onClick={() => navigate('/volunteer/dashboard')}
          >
            Go to Dashboard
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div style={{ maxWidth: 720, display: 'flex', flexDirection: 'column', gap: 24 }}>

        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 16,
          padding: 28,
          background: 'linear-gradient(135deg, var(--gn-blue-700), var(--gn-blue-900))',
          borderRadius: 'var(--radius-lg)',
          color: '#fff',
        }}>
          <FiShield style={{ fontSize: '2rem', flexShrink: 0, marginTop: 4 }} />
          <div>
            <h1 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: 6 }}>
              Volunteer Verification
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.75)', margin: 0 }}>
              Submit your government ID to become a verified GuardianNet volunteer.
            </p>
          </div>
        </div>

        {serverError && (
          <div className="gn-auth-alert">
            <FiAlertCircle /> {serverError}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          noValidate
          style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
        >
          <div className="gn-card" style={{ padding: 24 }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '1rem', marginBottom: 18 }}>
              <FiFileText /> Government ID
            </h3>

            <div className="gn-field">
              <label htmlFor="governmentIdType">ID Type</label>
              <select
                id="governmentIdType"
                name="governmentIdType"
                className={`gn-input${
                  touched.governmentIdType && errors.governmentIdType
                    ? ' gn-input-error'
                    : ''
                }`}
                value={values.governmentIdType}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ paddingLeft: 14 }}
              >
                <option value="">Select ID type</option>
                {ID_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
              {touched.governmentIdType && errors.governmentIdType && (
                <span className="gn-error-text">{errors.governmentIdType}</span>
              )}
            </div>

            <FormField
              label="ID Number"
              name="governmentIdNumber"
              value={values.governmentIdNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.governmentIdNumber}
              touched={touched.governmentIdNumber}
              placeholder="Enter your ID number"
              icon={<FiFileText />}
            />
          </div>

          <div className="gn-card" style={{ padding: 24 }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '1rem', marginBottom: 18 }}>
              <FiUser /> About You
            </h3>
            <div className="gn-field">
              <label htmlFor="bio">Short Bio (optional)</label>
              <textarea
                id="bio"
                name="bio"
                rows={3}
                value={values.bio}
                onChange={handleChange}
                placeholder="Tell the community a bit about yourself..."
                className="gn-input"
                style={{ paddingLeft: 14, paddingTop: 12, resize: 'vertical' }}
              />
            </div>
          </div>

          <div className="gn-card" style={{ padding: 24 }}>
            <h3 style={{ fontSize: '1rem', marginBottom: 8 }}>
              Emergency Categories You Can Handle
            </h3>
            <p style={{ fontSize: '0.85rem', marginBottom: 14 }}>
              Select all that apply
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 10,
            }}>
              {CATEGORIES.map((cat) => (
                <label
                  key={cat.value}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: `1px solid ${
                      selectedCategories.includes(cat.value)
                        ? 'var(--accent)'
                        : 'var(--border-subtle)'
                    }`,
                    background: selectedCategories.includes(cat.value)
                      ? 'rgba(36,81,196,0.08)'
                      : 'var(--bg-surface-2)',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    color: selectedCategories.includes(cat.value)
                      ? 'var(--accent)'
                      : 'var(--text-primary)',
                    fontWeight: selectedCategories.includes(cat.value) ? 600 : 400,
                  }}
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat.value)}
                    onChange={() => toggleCategory(cat.value)}
                    style={{ accentColor: 'var(--accent)' }}
                  />
                  {cat.label}
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="gn-btn gn-btn-primary gn-btn-block gn-btn-lg"
            disabled={submitting}
          >
            {submitting ? 'Submitting…' : <><FiUpload /> Submit Application</>}
          </button>
        </form>

      </div>
    </DashboardLayout>
  );
}
