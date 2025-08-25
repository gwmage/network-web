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
```typescript
// network-web/src/utils/api.test.js

// ... other imports and mocks

import { getCommentNotifications, markCommentNotificationAsRead } from './api';

describe('API functions', () => {

  // ... other test cases

  describe('getCommentNotifications', () => {
    it('should fetch comment notifications successfully', async () => {
      const userId = 1;
      const mockResponse = [{ id: 1, message: 'Test notification' }];
      axios.get.mockResolvedValue({ data: mockResponse });

      const response = await getCommentNotifications(userId);
      expect(axios.get).toHaveBeenCalledWith(`${API_BASE_URL}/users/${userId}/comment-notifications`);
      expect(response).toEqual(mockResponse);
    });

    it('should handle error during comment notifications fetching', async () => {
      const userId = 1;
      const error = new Error('Failed to fetch notifications');
      axios.get.mockRejectedValue(error);

      await expect(getCommentNotifications(userId)).rejects.toThrowError(error);
    });
  });


  describe('markCommentNotificationAsRead', () => {
    it('should mark notification as read successfully', async () => {
      const notificationId = 1;
      const mockResponse = { id: 1, message: 'Test notification', read: true };
      axios.put.mockResolvedValue({ data: mockResponse });

      const response = await markCommentNotificationAsRead(notificationId);
      expect(axios.put).toHaveBeenCalledWith(`${API_BASE_URL}/notifications/${notificationId}/read`);
      expect(response).toEqual(mockResponse);
    });

    it('should handle error during marking notification as read', async () => {
      const notificationId = 1;
      const error = new Error('Failed to mark as read');
      axios.put.mockRejectedValue(error);

      await expect(markCommentNotificationAsRead(notificationId)).rejects.toThrowError(error);
    });
  });


});

```