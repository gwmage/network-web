```typescript
import React, { useState, useEffect } from 'react';
import { getComments } from '../utils/api';
import Comment from './Comment';

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
          <Comment
            key={comment.id}
            comment={comment}
            currentUser={1} // Replace with actual current user ID
            onCommentDelete={() => {
              // Update the comment list after deletion by fetching comments again
              setComments(comments.filter((c) => c.id !== comment.id));
            }}
          />
        ))}
      </ul>
    </div>
  );
};

export default CommentList;

```