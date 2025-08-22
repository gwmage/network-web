```typescript
import axios from 'axios';

const API_BASE_URL = '/api'; // Or your API base URL

// ... (Existing code remains unchanged)

export const getCommentNotifications = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${userId}/comment-notifications`);
    return response.data;
  } catch (error) {
    console.error('Error fetching comment notifications:', error);
    throw error;
  }
};


export const markCommentNotificationAsRead = async (notificationId) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/notifications/${notificationId}/read`);
    return response.data;
  } catch (error) {
    console.error('Error marking comment notification as read:', error);
    throw error;
  }
};


// ... (Other functions remain unchanged)

```