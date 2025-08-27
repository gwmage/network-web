```typescript
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api'; // Replace with your API base URL

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
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

export const createReservation = async (reservationData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/reservations`, reservationData);
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

export const getReservations = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/reservations`);
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

export const getReservation = async (reservationId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/reservations/${reservationId}`);
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


export const updateReservation = async (reservationId, reservationData) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/reservations/${reservationId}`, reservationData);
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


export const deleteReservation = async (reservationId) => {
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
```