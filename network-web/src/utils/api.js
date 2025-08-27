```typescript
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api'; // Replace with your API base URL

// ... other existing functions

export const createComment = async (commentData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/comments/${commentData.postId}`, commentData);
    return response.data;
  } catch (error) {
    console.error('Error creating comment:', error);
    throw error;
  }
};

export const getComments = async (postId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/comments/${postId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};

export const updateComment = async (postId, commentId, commentData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/comments/${commentId}`, commentData);
    return response.data;
  } catch (error) {
    console.error('Error updating comment:', error);
    throw error;
  }
};

export const deleteComment = async (postId, commentId) => {
  try {
    await axios.delete(`${API_BASE_URL}/comments/${commentId}`);
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
};

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