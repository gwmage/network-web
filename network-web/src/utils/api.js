import axios from 'axios';

export const API_URL = process.env.REACT_APP_API_URL || "/api"; // Use relative path for api requests

// ... (other functions)

export const cancelReservation = async (reservationId, reason = '') => {
  try {
    const response = await axios.delete(`${API_URL}/reservations/${reservationId}`, {
      data: { cancellationReason: reason },
    });
    return response;
  } catch (error) {
    console.error('Error cancelling reservation:', error);
    throw error;  // Re-throw the error for proper handling in the calling component
  }
};

// ... (other functions)