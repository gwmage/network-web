```typescript
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api'; // Replace with your API base URL

// ... other existing functions

export const triggerMatch = async (userInput) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/match`, userInput);
    return response.data;
  } catch (error) {
    console.error('Error triggering match:', error);
    throw new Error('Failed to trigger match');
  }
};
```