```typescript
import React, { useState, useEffect } from 'react';
import { usePushNotifications } from '../../utils/pushNotifications';

const ReservationNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const { isSupported, subscribe, unsubscribe } = usePushNotifications();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('/api/reservations/notifications'); // Replace with your actual API endpoint
        if (response.ok) {
          const data = await response.json();
          setNotifications(data);
        } else {
          console.error('Failed to fetch notifications:', response.status);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();

    if (isSupported) {
      subscribe((newNotification) => {
        setNotifications((prevNotifications) => [...prevNotifications, newNotification]);
      });
    }


    return () => {
      if (isSupported) {
        unsubscribe();
      }
    };
  }, [isSupported, subscribe, unsubscribe]);

  return (
    <div>
      <h2>Reservation Notifications</h2>
      {notifications.map(notification => (
        <div key={notification.id} className={`notification notification-${notification.status || 'info'}`}>
          {notification.message}
        </div>
      ))}
    </div>
  );
};

export default ReservationNotifications;

```