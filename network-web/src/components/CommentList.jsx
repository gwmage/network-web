```typescript
import React from 'react';
import Comment from './Comment';
import './CommentList.css';

const CommentList = ({ comments, currentUser, onCommentUpdate, onCommentDelete }) => {

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
              currentUser={currentUser}
              onCommentDelete={onCommentDelete}
              onCommentUpdate={onCommentUpdate} 
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentList;
```