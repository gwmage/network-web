import axios from 'axios';

const API_BASE_URL = '/auth'; // Updated base URL

// ... (Existing code)

export const getMatchingResults = async () => {
  try {
    const response = await axios.get('/matching/results');
    return response.data;
  } catch (error) {
    console.error('Error getting matching results:', error);
    throw error;
  }
};

// ... other API functions

export const getNotifications = async () => {
  try {
    const response = await axios.get('/api/users/me/notifications'); // Adjust the endpoint
    return response.data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
};

export const updateNotificationReadStatus = async (notificationId, readStatus) => {
  try {
    await axios.put(`/api/notifications/${notificationId}`, { read: readStatus });
  } catch (error) {
    console.error('Error updating notification read status:', error);
    throw error;
  }
};

export const deleteNotification = async (notificationId) => {
  try {
    await axios.delete(`/api/notifications/${notificationId}`);
  } catch (error) {
    console.error('Error deleting notification:', error);
    throw error;
  }
};

export const getNotificationPreferences = async () => {
  try {
    const response = await axios.get('/api/users/me/notifications/preferences');
    return response.data;
  } catch (error) {
    console.error('Error fetching notification settings:', error);
    throw error; // Re-throw to handle in component
  }
};

export const updateNotificationPreferences = async (preferences) => {
  try {
    await axios.put('/api/users/me/notifications/preferences', preferences);
  } catch (error) {
    console.error('Error updating notification settings:', error);
    throw error; // Re-throw to handle in component
  }
};

export const getNotificationDeliveryStatus = async () => {
  try {
    const response = await axios.get('/api/users/me/notifications/status');
    return response.data;
  } catch (error) {
    console.error('Error getting notification delivery status:', error);
    throw error; // Re-throw the error
  }
};

export const subscribeToNewNotifications = (callback) => {
  // Replace with your actual real-time implementation (e.g., using WebSockets)
  // This is a placeholder for demonstration
  const socket = new WebSocket('ws://your-websocket-server'); // Replace with your server URL

  socket.onmessage = (event) => {
    const newNotification = JSON.parse(event.data);
    callback(newNotification);
  };

  return () => socket.close();
};