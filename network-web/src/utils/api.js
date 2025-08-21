```typescript
import axios from 'axios';

const API_BASE_URL = '/api'; // Or your API base URL

// ... (Existing code remains unchanged)

export const fetchPreferences = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/notifications/preferences`);
    return response.data;
  } catch (error) {
    console.error('Error fetching notification preferences:', error);
    throw error;
  }
};

export const updatePreferences = async (preferences) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/notifications/preferences`, preferences);
    return response.data;
  } catch (error) {
    console.error('Error updating notification preferences:', error);
    throw error;
  }
};

export const fetchNotifications = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/notifications`);
    return response.data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
};

export const updateNotificationStatus = async (notificationId, status) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/notifications/${notificationId}`, { status });
    return response.data;
  } catch (error) {
    console.error('Error updating notification status:', error);
    throw error;
  }
};


// ... (Rest of the file remains unchanged)

```