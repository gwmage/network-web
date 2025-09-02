```typescript
import axios from 'axios';

const API_BASE_URL = '/api'; // Or your API base URL

// Helper function to get the authentication token (e.g., from local storage)
const getAuthToken = () => {
  return localStorage.getItem('authToken'); // Or however you store the token
};

// ... (Existing code remains unchanged)

export const createPost = async (postData) => {
  try {
    const token = getAuthToken();
    const response = await axios.post(`${API_BASE_URL}/community/posts`, postData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

export const updatePost = async (postId, postData) => {
  try {
    const token = getAuthToken();
    const response = await axios.put(`${API_BASE_URL}/community/posts/${postId}`, postData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating post ${postId}:`, error);
    throw error;
  }
};

export const deletePost = async (postId) => {
  try {
    const token = getAuthToken();
    await axios.delete(`${API_BASE_URL}/community/posts/${postId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error(`Error deleting post ${postId}:`, error);
    throw error;
  }
};

export const createComment = async (postId, commentData) => {
  try {
    const token = getAuthToken();
    const response = await axios.post(`${API_BASE_URL}/community/posts/${postId}/comments`, commentData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating comment:', error);
    throw error;
  }
};

export const updateComment = async (postId, commentId, commentData) => {
  try {
    const token = getAuthToken();
    const response = await axios.patch(`${API_BASE_URL}/community/posts/${postId}/comments/${commentId}`, commentData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating comment ${commentId} for post ${postId}:`, error);
    throw error;
  }
};

export const deleteComment = async (postId, commentId) => {
  try {
    const token = getAuthToken();
    await axios.delete(`${API_BASE_URL}/community/posts/${postId}/comments/${commentId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error(`Error deleting comment ${commentId} for post ${postId}:`, error);
    throw error;
  }
};

// ... (Other functions remain unchanged)

```