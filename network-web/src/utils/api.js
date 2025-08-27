```typescript
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api'; // Replace with your API base URL

// ... other existing functions

export const getNotificationPreferences = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/notifications/preferences`);
    return response.data;
  } catch (error) {
    console.error("Error fetching notification preferences:", error);
    throw error;
  }
};

export const updateNotificationPreferences = async (preferences) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/notifications/preferences`, preferences);
    return response.data;
  } catch (error) {
    console.error("Error updating notification preferences:", error);
    throw error;
  }
};

export const getNotificationStatus = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/notifications/status`);
    return response.data;
  } catch (error) {
    console.error("Error fetching notification status:", error);
    throw error;
  }
};


export const subscribeToNotifications = async (subscription) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/notifications/subscribe`, subscription);
    return response.data;
  } catch (error) {
    console.error("Error subscribing to notifications:", error);
    throw error;
  }
};

export const unsubscribeFromNotifications = async (subscription) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/notifications/unsubscribe`, subscription);
    return response.data;
  } catch (error) {
    console.error("Error unsubscribing from notifications:", error);
    throw error;
  }
};

```