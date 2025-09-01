```typescript
import axios from 'axios';

const API_BASE_URL = '/api'; // Or your API base URL

// ... (Existing code remains unchanged)

export const submitUserPreferences = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/preferences`, userData);
    return response.data;
  } catch (error) {
    console.error('Error submitting user preferences:', error);
    throw error;
  }
};

export const triggerMatching = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/matching`);
    return response.data;
  } catch (error) {
    console.error('Error triggering matching:', error);
    throw error;
  }
};


export const getMatchingResults = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/matching/results`);
    return response.data;
  } catch (error) {
    console.error('Error getting matching results:', error);
    throw error;
  }
};


// ... (Other functions remain unchanged)

```