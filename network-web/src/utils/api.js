export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const fetchData = async (endpoint, options = {}) => {
  // ... (Existing fetchData function remains unchanged)
};

export const postData = async (endpoint, data, options = {}) => {
  // ... (Existing postData function remains unchanged)
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