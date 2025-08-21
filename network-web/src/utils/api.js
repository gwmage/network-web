```typescript
import axios from 'axios';

const API_BASE_URL = '/api'; // Or your API base URL

// ... (Existing code remains unchanged)

export const getNotificationPreferences = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/notifications/preferences`);
    return response.data;
  } catch (error) {
    console.error('Error fetching notification preferences:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

export const updateNotificationPreferences = async (preferences) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/notifications/preferences`, preferences);
    return response.data;
  } catch (error) {
    console.error('Error updating notification preferences:', error);
    throw error;
  }
};

export const getNotificationStatus = async (notificationId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/notifications/status/${notificationId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching notification status:', error);
    throw error;
  }
};


export const getReservationNotifications = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/reservations/notifications`);
    return response.data;
  } catch (error) {
    console.error('Error fetching reservation notifications:', error);
    throw error;
  }
};

```