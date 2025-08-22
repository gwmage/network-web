```typescript
import React, { useState, useEffect } from 'react';
import * as api from '../utils/api';
import Comment from './Comment';
import CommentForm from './CommentForm';

const CommentList = ({ postId, onCommentUpdate, currentUser }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const fetchedComments = await api.getComments(postId);
        setComments(fetchedComments);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId, onCommentUpdate]);

  const handleCreateComment = async (newComment) => {
    try {
      const createdComment = await api.createComment({ ...newComment, postId });
      setComments([...comments, createdComment]);
    } catch (err) {
      setError("Error creating comment: " + err.message);
    }
  };


  const handleUpdateComment = async (updatedComment) => {
    try {
      await api.updateComment(updatedComment.id, updatedComment);
      setComments(comments.map((comment) => (comment.id === updatedComment.id ? updatedComment : comment)));
    } catch (err) {
      setError("Error updating comment: " + err.message);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await api.deleteComment(commentId);
      setComments(comments.filter((comment) => comment.id !== commentId));
    } catch (err) {
      setError("Error deleting comment: " + err.message);
    }
  };


  if (loading) {
    return <p>Loading comments...</p>;
  }

  if (error) {
    return <p>Error loading comments: {error}</p>;
  }

  if (!comments || comments.length === 0) {
    return <p>No comments yet.</p>;
  }

  return (
    <div>
      <h3>Comments</h3>
      <CommentForm onSubmit={handleCreateComment} postId={postId} />
      <ul>
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            currentUser={currentUser}
            onUpdate={handleUpdateComment}
            onDelete={handleDeleteComment}
            postId={postId}
          />
        ))}
      </ul>
    </div>
  );
};

export default CommentList;

```