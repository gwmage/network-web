```typescript
import axios from 'axios';

const API_BASE_URL = '/api'; // Or your API base URL

// ... (Existing code remains unchanged)

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Data:', error.response.data);
      console.error('Status:', error.response.status);
      // console.error('Headers:', error.response.headers);  // Optional: Log headers for debugging
      throw new Error(`API Error: ${error.response.status} - ${error.response.data.message || 'Failed to register user'}`);
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


export const runMatching = async (matchingInput) => {
  // ... (Existing runMatching function remains unchanged)
};

```