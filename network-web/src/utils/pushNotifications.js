```typescript
import { getNotificationPreferences } from '../api/user';

export const sendPushNotification = async (notificationData: any) => {
  try {
    const preferences = await getNotificationPreferences();
    if (preferences.push) {
      // Check if the browser supports push notifications
      if ("Notification" in window) {
        // Request permission to display notifications
        if (Notification.permission === "granted") {
          // Create and display the notification
          new Notification(notificationData.title, {
            body: notificationData.body,
            data: notificationData.data, // Include any custom data
          });
        } else if (Notification.permission !== "denied") {
          Notification.requestPermission().then(async (permission) => {
            if (permission === "granted") {
              new Notification(notificationData.title, {
                body: notificationData.body,
                data: notificationData.data,
              });
            }
          });
        }
      }

      // Existing push service logic (e.g., Firebase) can be added here.
    }
  } catch (error) {
    console.error('Error sending push notification:', error);
    // Handle errors appropriately
  }
};

export const handleCommentPushNotification = async (commentData: any, type: string) => {
  // ... (rest of the function remains unchanged)
};

export const handleReservationCancellationNotification = async (reservationId: string) => {
  const notificationData = {
    title: 'Reservation Cancelled',
    body: `Your reservation (ID: ${reservationId}) has been successfully cancelled.`,
    data: { reservationId },
  };

  await sendPushNotification(notificationData);
};
```