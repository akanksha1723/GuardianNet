import React, { useState } from 'react';
import { FiUser, FiMail, FiMessageSquare, FiSend, FiCheckCircle } from 'react-icons/fi';
import { useForm } from '../../../hooks/useForm';
import { validateName, validateEmail, validateRequired } from '../../../utils/validators';
import FormField from '../../../components/common/FormField';
import './Contact.css';

const schema = {
  name: validateName,
  email: validateEmail,
  message: (value) => validateRequired(value, 'Message'),
};

export default function Contact() {
  const [sent, setSent] = useState(false);

  const {
    values, errors, touched,
    submitting, setSubmitting,
    handleChange, handleBlur,
    validateAll, reset,
  } = useForm({ name: '', email: '', message: '' }, schema);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validateAll()) return;
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    setSubmitting(false);
    setSent(true);
    reset();
    setTimeout(() => setSent(false), 4000);
  }

  return (
    <section id="contact" className="gn-section gn-contact">
      <div className="gn-container gn-contact-wrap">
        <div>
          <span className="gn-eyebrow">Contact</span>
          <h2 className="gn-section-title">Talk to the GuardianNet team</h2>
          <p className="gn-section-sub">
            Partnership, press, or safety concerns — we read every message.
            For active emergencies, use the SOS button instead.
          </p>
        </div>
        <form className="gn-card gn-contact-form" onSubmit={handleSubmit} noValidate>
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
          <div className="gn-field">
            <label htmlFor="message">Message</label>
            <div className="gn-input-wrap gn-textarea-wrap">
              <FiMessageSquare />
              <textarea
                id="message"
                name="message"
                rows={4}
                value={values.message}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="How can we help?"
                className={`gn-input gn-textarea${
                  touched.message && errors.message ? ' gn-input-error' : ''
                }`}
              />
            </div>
            {touched.message && errors.message && (
              <span className="gn-error-text" role="alert">
                {errors.message}
              </span>
            )}
          </div>
          <button
            type="submit"
            className="gn-btn gn-btn-primary gn-btn-block"
            disabled={submitting}
          >
            {submitting ? 'Sending…' : <><FiSend /> Send Message</>}
          </button>
          {sent && (
            <p className="gn-contact-success">
              <FiCheckCircle /> Message sent — we'll get back to you soon.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}