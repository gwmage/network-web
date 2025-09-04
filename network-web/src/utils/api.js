import axios from 'axios';

// ... other API functions

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post('/auth/login', credentials);
    return response.data; // Return both token and user data
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};


export const cancelReservation = async (reservationId, cancellationReason) => {
  try {
    const response = await axios.delete(`/reservations/${reservationId}`, { data: { cancellationReason } });
    return response.data;
  } catch (error) {
    console.error('Error cancelling reservation:', error);
    throw error; // Re-throw to handle in component
  }
};

// ... other API functions