```typescript
import React, { useState, useEffect } from 'react';
import { getComments } from '../utils/api';

const CommentList = ({ postId }) => {
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
  }, [postId]);


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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentList;

```