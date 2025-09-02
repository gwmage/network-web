```typescript
import axios from 'axios';

const API_BASE_URL = '/api'; // Or your API base URL

// Helper function to get the authentication token (e.g., from local storage)
const getAuthToken = () => {
  return localStorage.getItem('authToken'); // Or however you store the token
};

// ... (Existing code remains unchanged)

export const searchPosts = async (searchTerm, searchOption) => {
  try {
    const params = {
      search: searchTerm,
      option: searchOption,
    };
    const response = await axios.get(`${API_BASE_URL}/board/posts`, { params }); // Or your search endpoint
    return response.data;
  } catch (error) {
    console.error('Error searching posts:', error);
    throw error;
  }
};


```