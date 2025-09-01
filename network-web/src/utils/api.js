```typescript
import axios from 'axios';

const API_BASE_URL = '/api'; // Or your API base URL

// ... (Existing code remains unchanged)

export const requestMatch = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/match`, userData);
    return response.data;
  } catch (error) {
    console.error('Error requesting match:', error);
    if (error.response) {
      console.error('Data:', error.response.data);
      console.error('Status:', error.response.status);
      throw new Error(`API Error: ${error.response.status} - ${error.response.data.message || 'Failed to request match'}`);
    } else if (error.request) {
      console.error('Request:', error.request);
      throw new Error('Network Error: Failed to connect to the server');
    } else {
      console.error('Error:', error.message);
      throw new Error(`Request Error: ${error.message}`);
    }
  }
};


export const runMatching = async (matchingInput) => {
  // ... (Existing runMatching function remains unchanged)
};

```