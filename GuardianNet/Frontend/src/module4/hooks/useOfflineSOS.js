/**
 * Offline SOS — sends an emergency SMS directly from the user's
 * device using the native SMS app when there is no internet connection.
 *
 * This works by opening the device's SMS app with a pre-filled
 * message via a `sms:` URI. The user taps Send — no internet needed.
 *
 * In a real production app this would be backed by a native
 * wrapper (Capacitor / React Native). On web, the sms: URI
 * works on mobile browsers but not on desktop.
 */
export function useOfflineSOS() {

  // Check if the user currently has internet
  function isOnline() {
    return navigator.onLine;
  }

  /**
   * Send an SOS via the native SMS app.
   * @param {string[]} phoneNumbers  - emergency contact numbers
   * @param {string}   category      - emergency category
   * @param {object}   location      - { latitude, longitude }
   */
  function sendOfflineSOS(phoneNumbers, category, location) {
    const categoryText = category?.replace(/_/g, ' ') || 'Emergency';
    const locationText = location
      ? `https://maps.google.com/?q=${location.latitude},${location.longitude}`
      : 'Location unavailable';

    const message =
      `🚨 EMERGENCY SOS - GuardianNet\n` +
      `Type: ${categoryText}\n` +
      `Location: ${locationText}\n` +
      `Time: ${new Date().toLocaleString('en-IN')}\n` +
      `I need immediate help. Please call me or send someone.`;

    // Build SMS URI — works on Android and iOS mobile browsers
    // Multiple recipients: sms:num1,num2?body=message
    const recipients = phoneNumbers.join(',');
    const encodedMessage = encodeURIComponent(message);
    const smsUri = `sms:${recipients}?body=${encodedMessage}`;

    // Open native SMS app
    window.location.href = smsUri;

    return { sent: true, message, recipients };
  }

  /**
   * Try online SOS first. Fall back to offline SMS if no internet.
   */
  async function sendSOSWithFallback({
    onlineSOS,          // async function — the normal SOS flow
    phoneNumbers,       // emergency contact numbers for SMS fallback
    category,
    location,
  }) {
    if (isOnline()) {
      return onlineSOS();
    } else {
      // No internet — use SMS fallback
      return sendOfflineSOS(phoneNumbers, category, location);
    }
  }

  return {
    isOnline,
    sendOfflineSOS,
    sendSOSWithFallback,
  };
}