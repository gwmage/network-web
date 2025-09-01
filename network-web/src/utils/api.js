```typescript
import axios from 'axios';

const API_BASE_URL = '/api'; // Or your API base URL

// ... (Existing code remains unchanged)

export const fetchComments = async (postId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/posts/${postId}/comments`);
    return response.data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};

export const createComment = async (commentData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/posts/${commentData.postId}/comments`, commentData);
    return response.data;
  } catch (error) {
    console.error('Error creating comment:', error);
    throw error;
  }
};

export const updateComment = async (postId, commentId, commentData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/posts/${postId}/comments/${commentId}`, commentData);
    return response.data;
  } catch (error) {
    console.error('Error updating comment:', error);
    throw error;
  }
};

export const deleteComment = async (postId, commentId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/posts/${postId}/comments/${commentId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
};


// ... (Other functions remain unchanged)

```
