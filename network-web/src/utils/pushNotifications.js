import { getNotificationPreferences } from './api';

// Placeholder implementation for client-side push notifications
export const sendPushNotification = async (notificationData) => {
  try {
    const preferences = await getNotificationPreferences();
    // Check if push notifications are enabled in user preferences
    // Adapt the property name ('pushEnabled' in this example) to match your actual API response 
    if (preferences && preferences.pushEnabled) {
      // Check if browser notifications are supported and permitted
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
        } else {
          console.warn("Push notifications are blocked by the user.");
        }
      } else {
        console.warn("This browser does not support push notifications.");
      }
    }
  } catch (error) {
    console.error('Error sending push notification:', error);
  }
};

export const handleCommentPushNotification = async (commentData, type) => {
  // Construct notification data based on comment type (reply or new comment)
  const notificationData = {
    title: type === 'reply' ? 'New Reply to Your Comment' : 'New Comment on Your Post',
    body: commentData.content.slice(0, 50), // Display a preview of the comment
    data: { postId: commentData.postId, commentId: commentData._id }, // Include relevant IDs
  };

  await sendPushNotification(notificationData);
};

export const handleReservationCancellationNotification = async (reservationId) => {
  const notificationData = {
    title: 'Reservation Cancelled',
    body: `Your reservation (ID: ${reservationId}) has been successfully cancelled.`,
    data: { reservationId },
  };

  await sendPushNotification(notificationData);
};

// Placeholder for the pusher app key.  Replace with appropriate client-side key management if needed.
const pusherAppKey = "YOUR_PUSHER_APP_KEY_OR_IMPLEMENTATION"; // Replace or remove as needed.

export { pusherAppKey };
