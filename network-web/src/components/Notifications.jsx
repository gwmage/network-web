```typescript
import React, { useState, useEffect } from 'react';
import * as api from '../utils/api'; // Import the API functions

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);


  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await api.getNotifications();
        setNotifications(data);
      } catch (err) {
        console.error('Error fetching notifications:', err);
        setError('Failed to fetch notifications.');
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();

    const updateUnreadCount = () => {
      setUnreadCount(notifications.filter(n => !n.read).length);
    };

    updateUnreadCount();
  }, [notifications]);

  useEffect(() => {
    // Subscribe to new notification events (if using real-time updates like WebSockets)
    // Example using a hypothetical API function:
    const unsubscribe = api.subscribeToNewNotifications((newNotification) => {
      setNotifications((prevNotifications) => [...prevNotifications, newNotification]);
    });

    return () => unsubscribe(); // Clean up the subscription on unmount
  }, []);


  const markAsRead = async (notificationId) => {
    try {
      await api.updateNotificationReadStatus(notificationId, true);
      setNotifications(notifications.map((n) => (n.id === notificationId ? { ...n, read: true } : n)));
    } catch (err) {
      console.error('Error marking notification as read:', err);
      // Handle error, e.g., show a message to the user
    }
  };

  const dismissNotification = async (notificationId) => {
    try {
      await api.deleteNotification(notificationId); // Assuming an API endpoint for deleting notifications
      setNotifications(notifications.filter((n) => n.id !== notificationId));
    } catch (err) {
      console.error('Error dismissing notification:', err);
       // Handle error, e.g., show a message to the user
    }
  }


  if (loading) {
    return <div>Loading notifications...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Notifications <span className="unread-badge">{unreadCount > 0 && unreadCount}</span></h2>
      {notifications.length === 0 ? (
        <p>No notifications yet.</p>
      ) : (
        <ul>
          {notifications.map((notification) => (
            <li key={notification.id} className={notification.read ? 'read' : 'unread'}>
              {/* Display notification content based on type */}
              {notification.type === 'match_result' && (
                <div>
                  <h3>Match Found!</h3>
                 {/* ... other JSX as before ... */}
                </div>
              )}
              {/* ... other notification types as before ... */}
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
```