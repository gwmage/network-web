```typescript
import axios from 'axios';

const API_BASE_URL = '/api/board'; // Updated base URL
const PROFILE_API_BASE_URL = '/api/profile'; // New base URL for profile API

// ... (Existing code remains unchanged)

export const createProfile = async (profileData) => {
  try {
    const response = await axios.post(`${PROFILE_API_BASE_URL}`, profileData);
    return response.data;
  } catch (error) {
    console.error('Error creating profile:', error);
    throw error;
  }
};

export const getProfile = async () => {
  try {
    const response = await axios.get(`${PROFILE_API_BASE_URL}`);
    return response.data;
  } catch (error) {
    console.error('Error getting profile:', error);
    throw error;
  }
};

export const updateProfile = async (profileData) => {
  try {
    const response = await axios.put(`${PROFILE_API_BASE_URL}`, profileData);
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

// ... (Other functions remain unchanged)

```