```typescript
import axios from 'axios';

const API_BASE_URL = '/api'; // Or your API base URL

// ... (Existing code remains unchanged)

export const fetchComments = async (postId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/comments/${postId}`); // Updated endpoint
    return response.data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};

export const createComment = async (commentData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/comments`, commentData); // Updated endpoint
    return response.data;
  } catch (error) {
    console.error('Error creating comment:', error);
    throw error;
  }
};

export const updateComment = async (commentId, commentData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/comments/${commentId}`, commentData); // Updated endpoint
    return response.data;
  } catch (error) {
    console.error('Error updating comment:', error);
    throw error;
  }
};

export const deleteComment = async (commentId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/comments/${commentId}`); // Updated endpoint
    return response.data;
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
};


// ... (Other functions remain unchanged)

```