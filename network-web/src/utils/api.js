```javascript
import axios from 'axios';

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// ... (other functions)

export const cancelReservation = async (reservationId, reason = '') => {
  try {
    const response = await deleteData(`/reservations/${reservationId}`, {
      data: { cancellationReason: reason }, // Include reason in the request body
    });
    return response;
  } catch (error) {
    console.error('Error cancelling reservation:', error);
    throw error;
  }
};

// ... (other functions)
```