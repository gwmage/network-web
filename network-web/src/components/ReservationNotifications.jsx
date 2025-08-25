```typescript
import React, { useState, useEffect } from 'react';

const ReservationNotifications = () => {
  const [notifications, setNotifications] = useState([]);

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

    // Optional: Implement WebSocket for real-time updates
    // const socket = new WebSocket('ws://your-websocket-server'); // Replace with your WebSocket server URL

    // socket.onmessage = (event) => {
    //   const newNotification = JSON.parse(event.data);
    //   setNotifications((prevNotifications) => [...prevNotifications, newNotification]);
    // };

    // return () => {
    //   socket.close();
    // };
  }, []);

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