```typescript
import axios from 'axios';

const API_BASE_URL = '/api'; // Or your API base URL

// ... (Existing code remains unchanged)

export const getCancellationRestrictions = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/reservations/cancellation-restrictions`);
    return response.data;
  } catch (error) {
    console.error('Error fetching cancellation restrictions:', error);
    if (error.response) {
      console.error('Data:', error.response.data);
      console.error('Status:', error.response.status);
      console.error('Headers:', error.response.headers);
      throw new Error(`API Error: ${error.response.status} - ${error.response.data.message || 'Failed to fetch cancellation restrictions'}`);
    } else if (error.request) {
      console.error('Request:', error.request);
      throw new Error('Network Error: Failed to connect to the server');
    } else {
      console.error('Error:', error.message);
      throw new Error(`Request Error: ${error.message}`);
    }
  }
};

export const runMatchingWithCriteria = async (matchingCriteria) => {
  // ... (Existing code remains unchanged)
};
```