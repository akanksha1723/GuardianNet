import React, { useState, useEffect } from 'react';
import {
  FiMapPin, FiClock, FiAlertTriangle,
  FiCheckCircle, FiX, FiRefreshCw,
} from 'react-icons/fi';
import DashboardLayout from '../../../module2/components/DashboardLayout';
import { getNearbyVolunteers } from '../../services/volunteerService';
import './NearbyRequests.css';

// Placeholder emergency requests — replaced by real data in Module 4
const PLACEHOLDER_REQUESTS = [
  {
    id: 1,
    category: 'Medical Emergency',
    approximateArea: 'Andheri West, Mumbai',
    distance: '0.8 km',
    time: '2 min ago',
    urgent: true,
  },
  {
    id: 2,
    category: 'Need Escort',
    approximateArea: 'Bandra, Mumbai',
    distance: '1.4 km',
    time: '5 min ago',
    urgent: false,
  },
  {
    id: 3,
    category: 'Vehicle Breakdown',
    approximateArea: 'Juhu, Mumbai',
    distance: '2.1 km',
    time: '8 min ago',
    urgent: false,
  },
];

export default function NearbyRequests() {
  const [requests]          = useState(PLACEHOLDER_REQUESTS);
  const [accepted, setAccepted] = useState(null);
  const [rejected, setRejected] = useState([]);

  function handleAccept(id) {
    setAccepted(id);
  }

  function handleReject(id) {
    setRejected((prev) => [...prev, id]);
  }

  const visibleRequests = requests.filter(
    (r) => !rejected.includes(r.id) && accepted !== r.id
  );

  return (
    <DashboardLayout>
      <div className="gn-nearby-requests">

        <div className="gn-nearby-header">
          <div>
            <h1>Nearby Emergency Requests</h1>
            <p>These are requests within your area. Location is approximate until you accept.</p>
          </div>
          <button type="button" className="gn-btn gn-btn-ghost">
            <FiRefreshCw /> Refresh
          </button>
        </div>

        {accepted && (
          <div className="gn-nearby-accepted-banner">
            <FiCheckCircle />
            Request accepted! Full location and chat will be available in Module 4.
          </div>
        )}

        {visibleRequests.length === 0 && !accepted && (
          <div className="gn-nearby-empty">
            <FiMapPin />
            <h3>No requests nearby right now</h3>
            <p>You will receive a notification when a new request comes in.</p>
          </div>
        )}

        <div className="gn-nearby-list">
          {visibleRequests.map((req) => (
            <div key={req.id} className={`gn-nearby-card gn-card ${req.urgent ? 'is-urgent' : ''}`}>
              <div className="gn-nearby-card-top">
                <div className="gn-nearby-category">
                  <FiAlertTriangle />
                  {req.category}
                  {req.urgent && <span className="gn-nearby-urgent-badge">Urgent</span>}
                </div>
                <span className="gn-nearby-time"><FiClock /> {req.time}</span>
              </div>
              <div className="gn-nearby-location">
                <FiMapPin />
                <div>
                  <p>{req.approximateArea}</p>
                  <span>{req.distance} away · Approximate location only</span>
                </div>
              </div>
              <div className="gn-nearby-actions">
                <button
                  type="button"
                  className="gn-btn gn-btn-primary"
                  onClick={() => handleAccept(req.id)}
                >
                  <FiCheckCircle /> Accept
                </button>
                <button
                  type="button"
                  className="gn-btn gn-btn-ghost"
                  onClick={() => handleReject(req.id)}
                >
                  <FiX /> Skip
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </DashboardLayout>
  );
}