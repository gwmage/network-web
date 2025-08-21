```typescript
import axios from 'axios';

const API_BASE_URL = '/api'; // Or your API base URL

// ... (Existing code remains unchanged)


export const getPosts = async (page = 1, limit = 10, filter = {}) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/posts`, {
      params: { page, limit, ...filter }, // Includes filter parameters
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};


// ... (Other functions for createPost, getPost, updatePost, deletePost remain unchanged)

export const getComments = async (postId, page = 1, limit = 10) => { // Added pagination for comments
  try {
    const response = await axios.get(`${API_BASE_URL}/posts/${postId}/comments`, {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};

// ... (Other functions for createComment, updateComment, deleteComment remain unchanged)

```
