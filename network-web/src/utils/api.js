```typescript
import axios from 'axios';

const API_BASE_URL = '/api'; // Or your API base URL

// ... (Existing code remains unchanged)

export const searchPosts = async (params = {}) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/community/posts/search`, { params });
    return response.data;
  } catch (error) {
    console.error('Error searching posts:', error);
    throw error;
  }
};

// ... (Other functions remain unchanged)

```