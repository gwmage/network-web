```typescript
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/v1'; // Updated base URL to include /v1

// ... other existing functions

export const fetchMatchingResultsForUser = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/results/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching matching results for user ${userId}:`, error);
    throw error;
  }
};

// ... other existing functions

```