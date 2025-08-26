```typescript
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api'; // Replace with your API base URL

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response;
    } else if (error.request) {
      console.error('No response received from server:', error.request);
      throw new Error('Network error. Please check your connection.'); 
    } else {
      console.error('Error setting up request:', error.message);
      throw new Error('An unexpected error occurred. Please try again later.');
    }
  }
};

export const createComment = async (commentData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/comments`, commentData);
    return response.data;
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};

export const getComments = async (postId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/comments/${postId}`);
    return response.data;
  } catch (error) {
    console.error("Error getting comments:", error);
    throw error;
  }
};

export const updateComment = async (postId, commentId, commentData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/comments/${commentId}`, commentData);
    return response.data;
  } catch (error) {
    console.error("Error updating comment:", error);
    throw error;
  }
};

export const deleteComment = async (postId, commentId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/comments/${commentId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
};
```