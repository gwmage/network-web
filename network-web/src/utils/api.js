```typescript
import axios from 'axios';

const API_BASE_URL = '/api'; // Or your API base URL

// ... (Existing code remains unchanged)

export const runMatching = async (matchingInput) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/matching`, matchingInput);
    return response.data;
  } catch (error) {
    console.error('Error running matching:', error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Data:', error.response.data);
      console.error('Status:', error.response.status);
      console.error('Headers:', error.response.headers);
      throw new Error(`API Error: ${error.response.status} - ${error.response.data.message || 'Failed to run matching'}`);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Request:', error.request);
      throw new Error('Network Error: Failed to connect to the server');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error:', error.message);
      throw new Error(`Request Error: ${error.message}`);
    }
  }
};
```