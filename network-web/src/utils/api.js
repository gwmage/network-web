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
    throw error;
  }
};


export const searchPosts = async (searchTerm, searchOption = 'all') => {
  try {
    const params = {
      q: searchTerm,
      filter: searchOption, // Add filter based on search option
    };
    const response = await axios.get(`${API_BASE_URL}/community/posts/search`, { params });
    return response.data;
  } catch (error) {
    console.error('Error searching posts:', error);
    throw error;
  }
};


// ... (Other functions remain unchanged)

```
