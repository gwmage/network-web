```typescript
import axios from 'axios';

const API_BASE_URL = '/api'; // Or your API base URL

// ... (Existing code remains unchanged)

export const createComment = async (postId, commentData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/community/posts/${postId}/comments`, commentData);
    return response.data;
  } catch (error) {
    console.error('Error creating comment:', error);
    throw error;
  }
};

export const updateComment = async (postId, commentId, commentData) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/community/posts/${postId}/comments/${commentId}`, commentData);
    return response.data;
  } catch (error) {
    console.error('Error updating comment:', error);
    throw error;
  }
};

export const deleteComment = async (postId, commentId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/community/posts/${postId}/comments/${commentId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
};

export const getComments = async (postId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/community/posts/${postId}/comments`);
    return response.data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};

// ... (Other functions remain unchanged)
```