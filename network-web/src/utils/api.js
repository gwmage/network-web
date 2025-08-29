```typescript
import axios from 'axios';

const API_BASE_URL = '/api'; // Or your API base URL

// ... (Existing code remains unchanged)

export const getMatchingStatus = async (groupId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/matching/status`); // Corrected endpoint
    return response.data;
  } catch (error) {
    console.error('Error fetching matching status:', error);
    throw error;
  }
};

export const getMatchingResults = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/matching/groups`); // Corrected endpoint
    return response.data;
  } catch (error) {
    console.error('Error fetching matching results:', error);
    throw error;
  }
};


// ... (Other functions remain unchanged)

```