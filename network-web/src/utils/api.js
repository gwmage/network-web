```
export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const fetchData = async (endpoint, options = {}) => {
  const url = `${API_URL}${endpoint}`;
  const response = await fetch(url, options);

  if (!response.ok) {
    const errorData = await response.json(); // Attempt to parse error data from the response
    const errorMessage = errorData?.message || response.statusText; // Use error message from response if available
    throw new Error(errorMessage);
  }

  try {
    const data = await response.json();
    return data;
  } catch (error) {
    // Handle cases where response is not JSON (e.g., empty response for DELETE)
    if (response.status === 204) {
      return null; // Or any other appropriate value for successful empty responses
    }
    console.error("Error parsing JSON response:", error);
    throw error;
  }
};

export const postData = async (endpoint, data, options = {}) => {
  return fetchData(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // ... any other headers
    },
    body: JSON.stringify(data),
    ...options, // Allow overriding default options
  });
};


export const getComments = async (postId) => {
  try {
    const data = await fetchData(`/comments/${postId}`);
    return data;
  } catch (error) {
    console.error('Error getting comments:', error);
    throw error; // Re-throw the error to be handled by the calling component
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
      const data = await fetchData(`/comments/${commentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });
      return data;
    } catch (error) {
      console.error("Error updating comment:", error);
      throw error;
    }
  };
  
  export const deleteComment = async (commentId) => {
    try {
      await fetchData(`/comments/${commentId}`, { method: 'DELETE' });
    } catch (error) {
      console.error("Error deleting comment:", error);
      throw error;
    }
  };



export const createApplication = async (applicationData) => {
  // ... (Existing createApplication function remains unchanged)
};

export const cancelReservation = async (reservationId, reason = '') => {
  // ... (Existing cancelReservation function remains unchanged)
};

export const searchPosts = async (keyword, filters, sort, page, limit) => {
  try {
    const queryParams = new URLSearchParams({
      keyword,
      title: filters.title,
      content: filters.content,
      author: filters.author,
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
```