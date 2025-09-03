```typescript
import axios from 'axios';

const API_BASE_URL = '/api'; // Or your API base URL

// ... (Existing code remains unchanged)

export const cancelReservation = async (reservationId, cancellationReason) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/reservations/${reservationId}`, {
      data: { reason: cancellationReason } // Send cancellation reason in request body
    });
    return response.data;
  } catch (error) {
    console.error('Error cancelling reservation:', error);
    if (error.response) {
      console.error('Data:', error.response.data);
      console.error('Status:', error.response.status);
      console.error('Headers:', error.response.headers);
      throw new Error(`API Error: ${error.response.status} - ${error.response.data.message || 'Failed to cancel reservation'}`);
    } else if (error.request) {
      console.error('Request:', error.request);
      throw new Error('Network Error: Failed to connect to the server');
    } else {
      console.error('Error:', error.message);
      throw new Error(`Request Error: ${error.message}`);
    }
  }
};

export const getCancellationRestrictions = async () => {
  // ... (Existing code remains unchanged)
};

export const runMatchingWithCriteria = async (matchingCriteria) => {
  // ... (Existing code remains unchanged)
};
```