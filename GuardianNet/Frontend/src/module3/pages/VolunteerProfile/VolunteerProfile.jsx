import React, { useState } from 'react';
import { FiEdit2, FiSave, FiX, FiToggleRight, FiToggleLeft } from 'react-icons/fi';
import DashboardLayout from '../../../module2/components/DashboardLayout';
import TrustScoreCard from '../../components/TrustScoreCard';
import VerificationStatus from '../../components/VerificationStatus';
import RatingCard from '../../components/RatingCard';
import { useVolunteer } from '../../hooks/useVolunteer';
import { updateMyVolunteerProfile } from '../../services/volunteerService';
import './VolunteerProfile.css';

export default function VolunteerProfile() {
  const { profile, loading, error, toggleAvailability } = useVolunteer();
  const [editing, setEditing]   = useState(false);
  const [bio, setBio]           = useState('');
  const [saving, setSaving]     = useState(false);

  async function handleSave() {
    setSaving(true);
    try {
      await updateMyVolunteerProfile({ bio });
      setEditing(false);
    } catch {
      // handled silently — user stays in edit mode
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="gn-vol-profile-loading">Loading profile…</div>
      </DashboardLayout>
    );
  }

  if (error || !profile) {
    return (
      <DashboardLayout>
        <div className="gn-vol-profile-error">
          <p>{error || 'Profile not found.'}</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="gn-vol-profile">

        <div className="gn-vol-profile-header">
          <div className="gn-vol-profile-avatar">
            {profile.user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="gn-vol-profile-info">
            <h1>{profile.user?.name}</h1>
            <p>{profile.user?.email}</p>
            <button
              type="button"
              className={`gn-vol-avail-btn ${profile.isAvailable ? 'is-active' : ''}`}
              onClick={toggleAvailability}
            >
              {profile.isAvailable
                ? <><FiToggleRight /> Available</>
                : <><FiToggleLeft /> Unavailable</>
              }
            </button>
          </div>
        </div>

        <VerificationStatus
          status={profile.verificationStatus}
          note={profile.verificationNote}
        />

        <div className="gn-vol-profile-grid">
          <TrustScoreCard
            score={profile.trustScore}
            totalRatings={profile.totalRatings}
            averageRating={profile.averageRating}
          />

          <div className="gn-card gn-vol-bio-card">
            <div className="gn-vol-bio-header">
              <h3>About Me</h3>
              {!editing ? (
                <button type="button" className="gn-icon-btn" onClick={() => { setBio(profile.bio); setEditing(true); }}>
                  <FiEdit2 />
                </button>
              ) : (
                <div style={{ display: 'flex', gap: 8 }}>
                  <button type="button" className="gn-icon-btn gn-icon-btn--save" onClick={handleSave} disabled={saving}>
                    <FiSave />
                  </button>
                  <button type="button" className="gn-icon-btn" onClick={() => setEditing(false)}>
                    <FiX />
                  </button>
                </div>
              )}
            </div>
            {!editing ? (
              <p>{profile.bio || 'No bio added yet. Click the edit button to add one.'}</p>
            ) : (
              <textarea
                className="gn-input gn-textarea"
                rows={4}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell the community about yourself…"
                style={{ paddingLeft: 14 }}
              />
            )}
          </div>
        </div>

        <div className="gn-card gn-vol-ratings-card">
          <h3>Recent Ratings & Reviews</h3>
          {profile.totalRatings === 0 ? (
            <p className="gn-vol-no-ratings">
              No ratings yet. Complete emergency requests to earn ratings.
            </p>
          ) : (
            <div>
              <RatingCard rating={5} reviewer="Anonymous User" comment="Very responsive and helpful!" date={new Date()} />
            </div>
          )}
        </div>

      </div>
    </DashboardLayout>
  );
}