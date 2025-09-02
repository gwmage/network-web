```typescript
import React, { useEffect, useState } from 'react';
import Comment from './Comment';
import './CommentList.css';
import api from '../api';

const CommentList = ({ postId, currentUser, onCommentUpdate }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const fetchedComments = await api.getComments(parseInt(postId, 10));
        setComments(fetchedComments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [postId, onCommentUpdate]);

  if (!comments || comments.length === 0) {
    return <p>No comments yet.</p>;
  }

  const renderComments = (commentList) => {
    return (
      <ul className="comment-list">
        {commentList.map((comment) => (
          <li key={comment.id} className="comment-item">
            <Comment
              comment={comment}
              currentUser={currentUser}
              onCommentUpdate={onCommentUpdate}
            />
            {/* Render nested comments recursively */}
            {comment.children && renderComments(comment.children)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="comment-list-container">
      {renderComments(comments)}
    </div>
  );
};

export default CommentList;

```