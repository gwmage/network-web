```typescript
import React, { useState, useEffect } from 'react';
import * as api from '../utils/api';

const NotificationSettings = () => {
  const [pushEnabled, setPushEnabled] = useState(false);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchNotificationSettings = async () => {
      try {
        const settings = await api.getNotificationPreferences();
        setPushEnabled(settings.push_enabled);
        setEmailEnabled(settings.email_enabled);
      } catch (err) {
        console.error("Error fetching notification settings:", err);
        setError("Failed to load notification settings.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotificationSettings();
  }, []);

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
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Notification Settings</h2>
      {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
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

```