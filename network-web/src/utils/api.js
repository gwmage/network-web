import axios from 'axios';

// ... other API functions

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