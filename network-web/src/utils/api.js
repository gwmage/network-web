```typescript
import axios from 'axios';

const API_BASE_URL = '/api'; // Or your API base URL

// ... (Existing code remains unchanged)

export const initiateMatching = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/matching`);
    return response.data;
  } catch (error) {
    console.error('Error initiating matching:', error);
    throw error;
  }
};

// ... (Other functions remain unchanged)

```
