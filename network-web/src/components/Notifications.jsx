```typescript
import React, { useState, useEffect } from 'react';
import * as api from '../utils/api'; // Import the API functions

const Notifications = () => {
  // ... (Existing code)

  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // ... (Existing useEffect code)

    const updateUnreadCount = () => {
      setUnreadCount(notifications.filter(n => !n.read).length);
    };

    updateUnreadCount(); // Initial count
  }, [notifications]);


  useEffect(() => {
    // Subscribe to new notification events (if using real-time updates like WebSockets)
    // Example using a hypothetical API function:
    const unsubscribe = api.subscribeToNewNotifications((newNotification) => {
      setNotifications([...notifications, newNotification]);
    });
    return () => unsubscribe(); // Clean up the subscription on unmount

    // Or poll the API periodically for new notifications:
    // const intervalId = setInterval(fetchNotifications, 5000); // Check every 5 seconds
    // return () => clearInterval(intervalId);
  }, [notifications]);



  return (
    <div>
      <h2>Notifications <span className="unread-badge">{unreadCount > 0 && unreadCount}</span></h2> {/* Display unread count */}

      {/* ... (Rest of the component code) */}

      <ul>
        {notifications.map((notification) => (
          <li key={notification.id} className={notification.read ? 'read' : 'unread'} onClick={() => markAsRead(notification.id)}>
            {/* ... (notification content) */}
          </li>
        ))}
      </ul>
      {/* ... (Rest of the component code) */}
    </div>
  );
};

export default Notifications;

```