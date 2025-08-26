```typescript
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api'; // Replace with your API base URL

// ... other existing functions

export const triggerMatching = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/matching`);
    return response.data;
  } catch (error) {
    console.error("Error triggering matching:", error);
    throw error;
  }
};
```