```typescript
import React, { useEffect, useState } from 'react';
import Comment from './Comment';
import './CommentList.css';
import { getComments } from '../utils/api';

const CommentList = ({ postId, currentUser, onCommentUpdate }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const fetchedComments = await getComments(postId);
        setComments(fetchedComments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [postId, onCommentUpdate]);


  const renderComments = (commentList) => {
    if (!commentList || commentList.length === 0) {
      return <p>No comments yet.</p>;
    }

    return (
      <ul className="comment-list">
        {commentList.map((comment) => (
          <li key={comment.id} className="comment-item">
            <Comment
              comment={comment}
              currentUser={currentUser}
              onCommentUpdate={onCommentUpdate} // Pass the update handler
            />
            {/* Render nested comments recursively */}
            {comment.children && renderComments(comment.children)}
          </li>
        ))}
      </ul>
    );
  };

  return <div className="comment-list-container">{renderComments(comments)}</div>;
};

export default CommentList;

```