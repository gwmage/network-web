import React, { useState, useEffect } from 'react';
import * as api from '../utils/api';

const NotificationSettings = () => {
  // ... existing code

  const handleSaveSettings = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccessMessage('');

      await api.updateNotificationPreferences({
        push_enabled: pushEnabled,
        email_enabled: emailEnabled,
      });

      setSuccessMessage('Notification settings saved successfully!');
    } catch (err) {
      console.error("Error saving notification settings:", err);
      setError("Failed to save notification settings.");
    } finally {
        setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading settings...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>; // Add error styling
  }

  return (
    <div>
      <h2>Notification Settings</h2>
      {successMessage && <div className="success-message">{successMessage}</div>} {/* Add success styling */}
      <label>
        <input
          type="checkbox"
          checked={pushEnabled}
          onChange={(e) => setPushEnabled(e.target.checked)}
        />
        Push Notifications
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          checked={emailEnabled}
          onChange={(e) => setEmailEnabled(e.target.checked)}
        />
        Email Notifications
      </label>
      <br />
      <button onClick={handleSaveSettings} disabled={loading}>
        Save Settings
      </button>
    </div>
  );
};

export default NotificationSettings;