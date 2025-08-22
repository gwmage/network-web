```typescript
import React, { useState, useEffect } from 'react';
import { getComments, deleteComment } from '../utils/api';

const CommentList = ({ postId, onCommentUpdate }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const fetchedComments = await getComments(postId);
        setComments(fetchedComments);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId, onCommentUpdate]);

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(postId, commentId);
      setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error("Error deleting comment:", error);
      // Optionally, display an error message to the user
    }
  };


  if (loading) {
    return <p>Loading comments...</p>;
  }

  if (error) {
    return <p>Error loading comments: {error.message}</p>;
  }

  if (!comments || comments.length === 0) {
    return <p>No comments yet.</p>;
  }

  return (
    <div>
      <h3>Comments</h3>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <p>{comment.content}</p>
            <p>By: {comment.author || 'Anonymous'}</p>
            <p>Posted on: {comment.createdAt || 'Unknown'}</p>
            <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentList;

```