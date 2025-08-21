```typescript
import React, { useState, useEffect } from 'react';

const ReservationNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // TODO: Fetch reservation notifications from backend API
    // Example:
    // fetch('/api/reservations/notifications')
    //   .then(res => res.json())
    //   .then(data => setNotifications(data));

    // Mock notifications for now
    const mockNotifications = [
      { id: 1, message: 'Your reservation at Restaurant A has been confirmed.', status: 'success' },
      { id: 2, message: 'Your reservation request at Restaurant B is pending.', status: 'pending' },
      { id: 3, message: 'Your reservation at Restaurant C has been declined.', status: 'error' },
    ];
    setNotifications(mockNotifications);
  }, []);

  return (
    <div>
      <h2>Reservation Notifications</h2>
      {notifications.map(notification => (
        <div key={notification.id} className={`notification notification-${notification.status}`}>
          {notification.message}
        </div>
      ))}
    </div>
  );
};

export default ReservationNotifications;
```