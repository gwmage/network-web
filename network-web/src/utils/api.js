```typescript
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
```