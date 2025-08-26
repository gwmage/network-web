```typescript
import axios from 'axios';

const API_BASE_URL = '/api/board'; // Updated base URL

// ... (Existing code remains unchanged)

export const getNotificationPreferences = async () => {
  try {
    const response = await axios.get('/api/notifications/preferences');
    return response.data;
  } catch (error) {
    console.error('Error getting notification preferences:', error);
    throw error;
  }
};

export const saveNotificationPreferences = async (preferences) => {
  try {
    const response = await axios.put('/api/notifications/preferences', preferences);
    return response.data;
  } catch (error) {
    console.error('Error saving notification preferences:', error);
    throw error;
  }
};

```