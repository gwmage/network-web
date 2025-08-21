```typescript
import axios from 'axios';

const API_BASE_URL = '/api'; // Or your API base URL

// ... (Existing code remains unchanged)

export const createPost = async (postData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/community/posts`, postData);
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

export const getPosts = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/community/posts`, {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const getPost = async (postId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/community/posts/${postId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching post:', error);
    throw error;
  }
};


export const updatePost = async (postId, postData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/community/posts/${postId}`, postData);
    return response.data;
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
};

export const deletePost = async (postId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/community/posts/${postId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};


export const createComment = async (postId, commentData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/community/posts/${postId}/comments`, commentData);
    return response.data;
  } catch (error) {
    console.error('Error creating comment:', error);
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

export const getComment = async (postId, commentId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/community/posts/${postId}/comments/${commentId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching comment:', error);
    throw error;
  }
};


export const updateComment = async (postId, commentId, commentData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/community/posts/${postId}/comments/${commentId}`, commentData);
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

// ... (Other functions remain unchanged)

```