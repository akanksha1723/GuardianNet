import twilio from 'twilio';

// Only initialise Twilio if credentials are configured.
// This way the app still runs in development without Twilio set up —
// it just logs the SMS content to the console instead of sending it.
function getClient() {
  const sid   = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;

  if (!sid || !token || sid === 'your_account_sid_here') {
    return null;
  }

  return twilio(sid, token);
}

// ─────────────────────────────────────────────
// Send an SMS to a single phone number.
// Falls back to console.log in development if
// Twilio is not configured.
// ─────────────────────────────────────────────
export async function sendSMS(to, message) {
  const client = getClient();

  if (!client) {
    // Development fallback — log instead of send
    console.log(`📱 [SMS SIMULATION] To: ${to}`);
    console.log(`📱 [SMS SIMULATION] Message: ${message}`);
    return { simulated: true };
  }

  try {
    const result = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to,
    });
    console.log(`✅ SMS sent to ${to} — SID: ${result.sid}`);
    return result;
  } catch (error) {
    console.error(`❌ SMS failed to ${to}:`, error.message);
    throw error;
  }
}

// ─────────────────────────────────────────────
// Notify all emergency contacts for a user
// ─────────────────────────────────────────────
export async function notifyEmergencyContacts(contacts, userName, category, location) {
  const locationText = location?.approximateArea || 'an unknown location';
  const categoryText = category?.replace(/_/g, ' ') || 'emergency';

  const message =
    `🚨 GUARDIANNET ALERT\n\n` +
    `${userName} has sent an emergency SOS!\n\n` +
    `Emergency type: ${categoryText}\n` +
    `Location: ${locationText}\n\n` +
    `No volunteer responded in 30 seconds. Please check on them immediately.\n\n` +
    `If this is a life-threatening situation, call:\n` +
    `Police: 100 | Ambulance: 108 | Fire: 101`;

  const results = [];

  for (const contact of contacts) {
    if (!contact.notifyOnSOS) continue;
    if (!contact.phone) continue;

    try {
      const result = await sendSMS(contact.phone, message);
      results.push({ contact: contact.name, success: true, result });
    } catch (error) {
      results.push({ contact: contact.name, success: false, error: error.message });
    }
  }

  return results;
}

// ─────────────────────────────────────────────
// Notify security personnel
// In production this would call a security agency API.
// For now it sends an SMS to the configured security number.
// ─────────────────────────────────────────────
export async function notifySecurityPersonnel(userName, category, location) {
  const securityNumber = process.env.SECURITY_PERSONNEL_PHONE;
  if (!securityNumber) {
    console.log('⚠️  SECURITY_PERSONNEL_PHONE not set — skipping security alert');
    return null;
  }

  const locationText = location?.approximateArea || 'unknown location';
  const categoryText = category?.replace(/_/g, ' ') || 'emergency';

  const message =
    `🚨 SECURITY ALERT — GuardianNet\n\n` +
    `User: ${userName}\n` +
    `Emergency: ${categoryText}\n` +
    `Location: ${locationText}\n` +
    `Time: ${new Date().toLocaleString('en-IN')}\n\n` +
    `No volunteer responded. Immediate attention required.`;

  return sendSMS(securityNumber, message);
}