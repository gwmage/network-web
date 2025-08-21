```typescript
import React, { useState, useEffect } from 'react';
import * as api from '../utils/api';
import Comment from './Comment';

const CommentList = ({ postId, onCommentUpdate }) => {
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

  if (loading) {
    return <p>Loading comments...</p>;
  }

  if (error) {
    return <p>Error loading comments: {error.message}</p>;
  }

  if (!comments || comments.length === 0) {
    return <p>No comments yet.</p>;
  }

  const renderComments = (comments) => {
    return comments.map((comment) => (
      <li key={comment.id}>
        <Comment comment={comment} postId={postId} onCommentUpdate={onCommentUpdate} />
        {comment.replies && <ul>{renderComments(comment.replies)}</ul>}
      </li>
    ));
  };

  return (
    <div>
      <h3>Comments</h3>
      <ul>
        {renderComments(comments)}
      </ul>
    </div>
  );
};

export default CommentList;

```