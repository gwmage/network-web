import axios from 'axios';

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const fetchData = async (endpoint, options = {}) => {
  const url = `${API_URL}${endpoint}`;
  try {
    const response = await axios(url, options);
    return response.data;
  } catch (error) {
    console.error(`Error fetching from ${url}:`, error);
    throw error; // Re-throw to be handled by the calling component
  }
};

export const postData = async (endpoint, data, options = {}) => {
  return fetchData(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(data),
    ...options,
  });
};

export const putData = async (endpoint, data, options = {}) => {
  return fetchData(endpoint, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(data),
    ...options,
  });
};

export const deleteData = async (endpoint, options = {}) => {
  return fetchData(endpoint, {
    method: 'DELETE',
    ...options,
  });
};

export const getPosts = async (page = 1, limit = 10, filters = {}) => {
  const queryParams = new URLSearchParams({
    page,
    limit,
    ...filters, // Add category and tag filters here
  }).toString();
  return fetchData(`/api/posts?${queryParams}`);
};

export const getPost = async (postId) => {
  return fetchData(`/api/posts/${postId}`);
};


export const createPost = async (postData) => {
  return postData('/api/posts', postData);
};

export const updatePost = async (postId, updatedPost) => {
  return putData(`/api/posts/${postId}`, updatedPost);
};

export const deletePost = async (postId) => {
  return deleteData(`/api/posts/${postId}`);
};


export const getComments = async (postId) => {
  try {
    const data = await fetchData(`/comments/${postId}`);
    return data;
  } catch (error) {
    console.error('Error getting comments:', error);
    throw error;
  }
};

export const createComment = async (postId, { content, parentCommentId }) => {
  try {
    const data = await postData(`/comments/${postId}`, { content, parentCommentId });
    return data;
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
};

export const updateComment = async (postId, commentId, { content }) => {
  try {
    const data = await putData(`/comments/${commentId}`, { content });
    return data;
  } catch (error) {
    console.error("Error updating comment:", error);
    throw error;
  }
};

export const deleteComment = async (commentId) => {
  try {
    await deleteData(`/comments/${commentId}`);
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
};


export const searchPosts = async (keyword, filters, sort, page, limit) => {
  try {
    const queryParams = new URLSearchParams({
      keyword,
      title: filters.title,
      content: filters.content,
      author: filters.author,
      category: filters.category, // Add category filter
      tags: filters.tags.join(','),    // Add tags filter (comma separated)
      sort,
      page,
      limit,
    }).toString();

    const data = await fetchData(`/posts/search?${queryParams}`);
    return data;
  } catch (error) {
    console.error("Error searching posts:", error);
    throw error;
  }
};


export const createApplication = async (applicationData) => {
  // ... (Existing createApplication function remains unchanged)
};

export const cancelReservation = async (reservationId, reason = '') => {
  // ... (Existing cancelReservation function remains unchanged)
};