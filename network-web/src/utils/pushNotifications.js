import { getNotificationPreferences } from './api'; // Import from api.js


export const sendPushNotification = async (notificationData) => {
  try {
    const preferences = await getNotificationPreferences();
    if (preferences.push_enabled) { // Use push_enabled from preferences

      if ("Notification" in window) {
        if (Notification.permission === "granted") {
          new Notification(notificationData.title, {
            body: notificationData.body,
            data: notificationData.data,
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
    }
  } catch (error) {
    console.error('Error sending push notification:', error);
  }
};

export const handleCommentPushNotification = async (commentData, type) => {
  // ... (rest of the function remains unchanged)
};

export const handleReservationCancellationNotification = async (reservationId) => {
  const notificationData = {
    title: 'Reservation Cancelled',
    body: `Your reservation (ID: ${reservationId}) has been successfully cancelled.`,
    data: { reservationId },
  };

  await sendPushNotification(notificationData);
};