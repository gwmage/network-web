import React, { useState, useEffect } from 'react';
import * as api from '../utils/api';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [preferences, setPreferences] = useState(null);
  const userId = 1; // Replace with actual user ID retrieval

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const fetchedPreferences = await api.getNotificationPreferences();
        setPreferences(fetchedPreferences);
      } catch (error) {
        console.error("Error fetching notification preferences:", error);
        // Handle error appropriately
      }
    };

    fetchPreferences();
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const allNotifications = await Promise.all([
          api.getNotifications(userId),
          api.getMatchingResultNotifications(userId),
        ]);

        const mergedNotifications = allNotifications.flat();
        setNotifications(mergedNotifications);
        setUnreadCount(mergedNotifications.filter(n => !n.read).length);
      } catch (err) {
        console.error("Error fetching notifications:", err);
        setError("Failed to load notifications.");
      } finally {
        setLoading(false);
      }
    };


    if (preferences) {
      fetchNotifications();
    }
  }, [preferences]);

  const filterNotifications = () => {
    if (!preferences) {
      return notifications;
    }

    return notifications.filter(notification => {
      switch (notification.type) {
        case 'general':
          return preferences.new_message_notifications;
        case 'match_result':
          return preferences.matching_result_notifications;
        // Add other notification types and preference checks as needed.
        default:
          return true; 
      }
    });
  };

  const markAsRead = async (notificationId) => {
    try {
      await api.updateNotificationStatus(notificationId, 'read');
      setNotifications(notifications.map(n => (n.id === notificationId ? { ...n, read: true } : n)));
      setUnreadCount(unreadCount - 1);
    } catch (err) {
      console.error("Error marking notification as read:", err);
      // Handle error, e.g., display error message
    }
  };

  const dismissNotification = async (notificationId) => {
    try {
      // Implement API call to dismiss notification if needed
      setNotifications(notifications.filter(n => n.id !== notificationId));
      setUnreadCount(notifications.filter(n => !n.read && n.id !== notificationId).length);
    } catch (err) {
      console.error("Error dismissing notification:", err);
       // Handle error, e.g., display error message
    }
  };


  const filteredNotifications = filterNotifications();

  return (
    <div>
      <h2>Notifications <span className="unread-badge">{unreadCount > 0 && unreadCount}</span></h2>
      {loading ? (
        <div>Loading notifications...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : filteredNotifications.length === 0 ? (
        <p>No notifications yet.</p>
      ) : (
        <ul>
          {filteredNotifications.map((notification) => (
            <li key={notification.id} className={`notification ${notification.read ? 'read' : 'unread'} ${notification.type === 'match_result' ? 'match-result' : ''}`}>
              {/* Display notification content based on type */}
              {notification.type === 'match_result' && (
                <div>
                  <h3>Match Found!</h3>
                  <p>Number of matches: {notification.data.matchCount}</p>
                  {/* Display other relevant matching data */}
                </div>
              )}
              {notification.type === 'general' && (
                <p>{notification.message}</p>
              )}
              {/* ... other notification types ... */}
              <button onClick={() => markAsRead(notification.id)} disabled={notification.read}>Mark as Read</button>
              <button onClick={() => dismissNotification(notification.id)}>Dismiss</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};


export default Notifications;