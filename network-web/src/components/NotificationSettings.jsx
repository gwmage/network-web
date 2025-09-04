import React, { useState, useEffect } from 'react';
import * as api from '../utils/api';
import { MenuItem, Select, FormControl, InputLabel, Switch, FormGroup, FormControlLabel } from '@mui/material';

const NotificationSettings = () => {
  const [pushEnabled, setPushEnabled] = useState(false);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [newMessageNotifications, setNewMessageNotifications] = useState(false);
  const [newConnectionNotifications, setNewConnectionNotifications] = useState(false);
  const [matchingResultNotifications, setMatchingResultNotifications] = useState(false);
  const [timeWindowStart, setTimeWindowStart] = useState('09:00');
  const [timeWindowEnd, setTimeWindowEnd] = useState('17:00');


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchNotificationPreferences = async () => {
      try {
        const preferences = await api.getNotificationPreferences();
        setPushEnabled(preferences.push_enabled);
        setEmailEnabled(preferences.email_enabled);
        setNewMessageNotifications(preferences.new_message_notifications);
        setNewConnectionNotifications(preferences.new_connection_notifications);
        setMatchingResultNotifications(preferences.matching_result_notifications);
        setTimeWindowStart(preferences.time_window_start || '09:00');
        setTimeWindowEnd(preferences.time_window_end || '17:00');
      } catch (err) {
        console.error("Error fetching notification preferences:", err);
        setError("Failed to load notification settings.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotificationPreferences();
  }, []);


  const handleSaveSettings = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccessMessage('');

      await api.updateNotificationPreferences({
        push_enabled: pushEnabled,
        email_enabled: emailEnabled,
        new_message_notifications: newMessageNotifications,
        new_connection_notifications: newConnectionNotifications,
        matching_result_notifications: matchingResultNotifications,
        time_window_start: timeWindowStart,
        time_window_end: timeWindowEnd,
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
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div>
      <h2>Notification Settings</h2>
      {successMessage && <div className="success-message">{successMessage}</div>}
      <FormGroup>
        <FormControlLabel control={<Switch checked={pushEnabled} onChange={(e) => setPushEnabled(e.target.checked)} />} label="Push Notifications" />
        <FormControlLabel control={<Switch checked={emailEnabled} onChange={(e) => setEmailEnabled(e.target.checked)} />} label="Email Notifications" />
      </FormGroup>

      <h3>Event Types</h3>
      <FormGroup>
        <FormControlLabel control={<Switch checked={newMessageNotifications} onChange={(e) => setNewMessageNotifications(e.target.checked)} />} label="New Messages" />
        <FormControlLabel control={<Switch checked={newConnectionNotifications} onChange={(e) => setNewConnectionNotifications(e.target.checked)} />} label="New Connection Requests" />
        <FormControlLabel control={<Switch checked={matchingResultNotifications} onChange={(e) => setMatchingResultNotifications(e.target.checked)} />} label="Matching Results" />
      </FormGroup>

      <h3>Notification Time Window</h3>
      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="time-window-start-label">Start</InputLabel>
        <Select
          labelId="time-window-start-label"
          id="time-window-start"
          value={timeWindowStart}
          label="Start"
          onChange={e => setTimeWindowStart(e.target.value)}
        >
          {Array.from(Array(24).keys()).map(hour => (
            <MenuItem key={hour} value={`${hour.toString().padStart(2, '0')}:00`}>
              {`${hour.toString().padStart(2, '0')}:00`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="time-window-end-label">End</InputLabel>
        <Select
          labelId="time-window-end-label"
          id="time-window-end"
          value={timeWindowEnd}
          label="End"
          onChange={e => setTimeWindowEnd(e.target.value)}
        >
          {Array.from(Array(24).keys()).map(hour => (
            <MenuItem key={hour} value={`${hour.toString().padStart(2, '0')}:00`}>
              {`${hour.toString().padStart(2, '0')}:00`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <br />
      <button onClick={handleSaveSettings} disabled={loading}>
        Save Settings
      </button>
    </div>
  );
};

export default NotificationSettings;