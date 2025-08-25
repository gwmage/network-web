```typescript
import axios from 'axios';

const API_BASE_URL = '/api'; // Or your API base URL

// ... (Existing code remains unchanged)

export const createReservation = async (reservationData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/reservation`, reservationData);
    return response.data;
  } catch (error) {
    console.error('Error creating reservation:', error);
    throw error;
  }
};

export const getReservation = async (reservationId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/reservation/${reservationId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching reservation:', error);
    throw error;
  }
};

export const updateReservation = async (reservationId, reservationData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/reservation/${reservationId}`, reservationData);
    return response.data;
  } catch (error) {
    console.error('Error updating reservation:', error);
    throw error;
  }
};

export const patchReservation = async (reservationId, reservationData) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/reservation/${reservationId}`, reservationData);
    return response.data;
  } catch (error) {
    console.error('Error patching reservation:', error);
    throw error;
  }
};

export const deleteReservation = async (reservationId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/reservation/${reservationId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting reservation:', error);
    throw error;
  }
};

// ... (Other functions remain unchanged)

```
