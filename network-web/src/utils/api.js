```typescript
import axios from 'axios';

const API_BASE_URL = '/api'; // Or your API base URL

// ... (Existing code remains unchanged)

export const getMatchingResults = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/matching/results`);
    return response.data;
  } catch (error) {
    console.error('Error fetching matching results:', error);
    throw error;
  }
};

export const getMatchingExplanation = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/matching/explanation`);
    return response.data;
  } catch (error) {
    console.error('Error fetching matching explanation:', error);
    throw error;
  }
};

export const getMatchingVisualizationData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/matching/visualization`);
    return response.data;
  } catch (error) {
    console.error('Error fetching matching visualization data:', error);
    throw error;
  }
};

```