import React, { useState, useEffect } from 'react';
import {
  FiPlus, FiTrash2, FiSave, FiUser,
  FiPhone, FiCheckCircle, FiAlertCircle,
} from 'react-icons/fi';
import DashboardLayout from '../../../module2/components/DashboardLayout';
import { getEmergencyContacts, saveEmergencyContacts } from '../../services/emergencyService';
import './EmergencyContacts.css';

const EMPTY_CONTACT = { name: '', phone: '', relationship: 'Friend', notifyOnSOS: true };

export default function EmergencyContacts() {
  const [contacts, setContacts] = useState([{ ...EMPTY_CONTACT }]);
  const [saving, setSaving]     = useState(false);
  const [saved, setSaved]       = useState(false);
  const [error, setError]       = useState('');

  useEffect(() => {
    async function loadContacts() {
      try {
        const data = await getEmergencyContacts();
        if (data.data && data.data.length > 0) {
          setContacts(data.data);
        }
      } catch {
        // No contacts yet
      }
    }
    loadContacts();
  }, []);

  function addContact() {
    if (contacts.length >= 5) return;
    setContacts((prev) => [...prev, { ...EMPTY_CONTACT }]);
  }

  function removeContact(index) {
    setContacts((prev) => prev.filter((_, i) => i !== index));
  }

  function updateContact(index, field, value) {
    setContacts((prev) =>
      prev.map((c, i) => (i === index ? { ...c, [field]: value } : c))
    );
  }

  async function handleSave() {
    setError('');
    const valid = contacts.every((c) => c.name.trim() && c.phone.trim());
    if (!valid) {
      setError('Please fill in name and phone for all contacts.');
      return;
    }

    setSaving(true);
    try {
      await saveEmergencyContacts(contacts);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err?.response?.data?.message || 'Could not save contacts.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <DashboardLayout>
      <div className="gn-ec-page">

        <div className="gn-ec-header">
          <div>
            <h1>Emergency Contacts</h1>
            <p>
              These people will be notified automatically if no volunteer
              responds to your SOS within 30 seconds.
            </p>
          </div>
          <span className="gn-ec-count">{contacts.length}/5 contacts</span>
        </div>

        {error && (
          <div className="gn-auth-alert">
            <FiAlertCircle /> {error}
          </div>
        )}

        {saved && (
          <div className="gn-ec-saved">
            <FiCheckCircle /> Contacts saved successfully!
          </div>
        )}

        <div className="gn-ec-list">
          {contacts.map((contact, index) => (
            <div key={index} className="gn-card gn-ec-card">
              <div className="gn-ec-card-header">
                <span className="gn-ec-card-num">Contact {index + 1}</span>
                {contacts.length > 1 && (
                  <button
                    type="button"
                    className="gn-ec-remove"
                    onClick={() => removeContact(index)}
                  >
                    <FiTrash2 />
                  </button>
                )}
              </div>

              <div className="gn-ec-fields">
                <div className="gn-field">
                  <label>Full Name</label>
                  <div className="gn-input-wrap">
                    <FiUser />
                    <input
                      type="text"
                      className="gn-input"
                      placeholder="Contact name"
                      value={contact.name}
                      onChange={(e) => updateContact(index, 'name', e.target.value)}
                    />
                  </div>
                </div>

                <div className="gn-field">
                  <label>Phone Number</label>
                  <div className="gn-input-wrap">
                    <FiPhone />
                    <input
                      type="tel"
                      className="gn-input"
                      placeholder="Mobile number"
                      value={contact.phone}
                      onChange={(e) => updateContact(index, 'phone', e.target.value)}
                    />
                  </div>
                </div>

                <div className="gn-field">
                  <label>Relationship</label>
                  <select
                    className="gn-input"
                    value={contact.relationship}
                    onChange={(e) => updateContact(index, 'relationship', e.target.value)}
                    style={{ paddingLeft: 14 }}
                  >
                    {['Family', 'Friend', 'Colleague', 'Neighbour', 'Doctor', 'Other'].map(
                      (r) => <option key={r} value={r}>{r}</option>
                    )}
                  </select>
                </div>
              </div>

              <label className="gn-checkbox gn-ec-notify">
                <input
                  type="checkbox"
                  checked={contact.notifyOnSOS}
                  onChange={(e) => updateContact(index, 'notifyOnSOS', e.target.checked)}
                />
                Notify this person when I send SOS
              </label>
            </div>
          ))}
        </div>

        <div className="gn-ec-actions">
          {contacts.length < 5 && (
            <button
              type="button"
              className="gn-btn gn-btn-ghost"
              onClick={addContact}
            >
              <FiPlus /> Add Another Contact
            </button>
          )}
          <button
            type="button"
            className="gn-btn gn-btn-primary"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? 'Saving…' : <><FiSave /> Save Contacts</>}
          </button>
        </div>

      </div>
    </DashboardLayout>
  );
}