```typescript
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/v1'; // Updated base URL to include /v1

// ... other existing functions

export const saveNotificationPreferences = async (preferences) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/notifications/preferences`, preferences);
    return response.data;
  } catch (error) {
    console.error("Error saving notification preferences:", error);
    throw error;
  }
};

export const fetchMatchingResults = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/matching/results`); // Placeholder endpoint - adjust as needed
    return response.data;
  } catch (error) {
    console.error("Error fetching matching results:", error);
    throw error;
  }
};

export const fetchNotificationStatus = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/notifications/status`);
    return response.data;
  } catch (error) {
    console.error("Error fetching notification status:", error);
    throw error;
  }
};

export const updateNotificationStatus = async (status) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/notifications/status`, status);
    return response.data;
  } catch (error) {
    console.error("Error updating notification status:", error);
    throw error;
  }
};
// ... other existing functions

```
