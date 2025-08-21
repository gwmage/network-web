```typescript
import React, { useState, useEffect } from 'react';
import * as api from '../utils/api';
import Comment from './Comment';

const CommentList = ({ postId, onCommentUpdate, currentUser }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { comments: fetchedComments, hasMore } = await api.getComments(postId, page);
        setComments((prevComments) => (page === 1 ? fetchedComments : [...prevComments, ...fetchedComments]));
        setHasMore(hasMore);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId, page, onCommentUpdate]);

  if (loading) {
    return <p>Loading comments...</p>;
  }

  if (error) {
    return <p>Error loading comments: {error.message}</p>;
  }

  if (!comments || comments.length === 0) {
    return <p>No comments yet.</p>;
  }

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <h3>Comments</h3>
      <ul>
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            currentUser={currentUser}
            onCommentDelete={(commentId) => {
              setComments(comments.filter((c) => c.id !== commentId));
              if (onCommentUpdate) {
                onCommentUpdate();
              }
            }}
          />
        ))}
      </ul>
      {hasMore && (
        <button onClick={loadMore} disabled={loading}>
          Load More
        </button>
      )}
    </div>
  );
};

export default CommentList;

```