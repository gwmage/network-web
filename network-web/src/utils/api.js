```typescript
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const cancelReservation = async (reservationId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/reservations/${reservationId}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response;
    } else if (error.request) {
      console.error('No response received from server:', error.request);
      throw new Error('Network error. Please check your connection.');
    } else {
      console.error('Error setting up request:', error.message);
      throw new Error('An unexpected error occurred. Please try again later.');
    }
  }
};

export const submitUserInput = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/input`, userData);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response;
    } else if (error.request) {
      console.error('No response received from server:', error.request);
      throw new Error('Network error. Please check your connection.');
    } else {
      console.error('Error setting up request:', error.message);
      throw new Error('An unexpected error occurred. Please try again later.');
    }
  }
};

export const getMatches = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/matches/${userId}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response;
    } else if (error.request) {
      console.error('No response received from server:', error.request);
      throw new Error('Network error. Please check your connection.');
    } else {
      console.error('Error setting up request:', error.message);
      throw new Error('An unexpected error occurred. Please try again later.');
    }
  }
};
```