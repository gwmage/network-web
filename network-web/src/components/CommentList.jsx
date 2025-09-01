```typescript
import React, { useState, useEffect } from 'react';
import * as api from '../utils/api';
import Comment from './Comment';
import './CommentList.css';

const CommentList = ({ itemId, onCommentUpdate }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const fetchedComments = await api.getComments(itemId);
        setComments(fetchedComments);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [itemId, onCommentUpdate]);

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
    <div className="comment-list-container">
      <h3>Comments</h3>
      <ul className="comment-list">
        {comments.map((comment) => (
          <li key={comment.id} className="comment-item">
            <Comment
              comment={comment}
              currentUser={1} // Replace with actual current user ID
              onCommentDelete={(commentId) => {
                setComments(comments.filter((c) => c.id !== commentId));
                if (onCommentUpdate) {
                  onCommentUpdate();
                }
              }}
              onCommentUpdate={(updatedComment) => {
                setComments(comments.map((c) => (c.id === updatedComment.id ? updatedComment : c)));
                if (onCommentUpdate) {
                  onCommentUpdate();
                }
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentList;

```