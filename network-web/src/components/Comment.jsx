```typescript
import React, { useState } from 'react';
import { deleteComment, updateComment } from '../utils/api';
import CommentForm from './CommentForm';
import { format } from 'date-fns';
import './Comment.css';

// ... (Other imports and types remain unchanged)

const Comment: React.FC<CommentProps> = ({ comment, currentUser, onCommentDelete, onCommentCreate, onCommentUpdate }) => {
  // ... (Other state variables remain unchanged)

  const handleEdit = async (updatedContent: string) => {
    // ... (This function remains unchanged)
  };

  const handleDelete = async () => {
    // ... (This function remains unchanged)
  };

  // ... (Other functions remain unchanged)

  return (
    <div className="comment-container">
      <div className="comment-header">
        {/* ... (other elements in header remain unchanged) */}
        <span className="comment-timestamp">
          {format(new Date(comment.createdAt), 'yyyy-MM-dd HH:mm')}
        </span>
      </div>
      {/* ... (Other JSX remains unchanged) */}

      {isEditing ? (
        <CommentForm
          initialContent={comment.content}
          onSubmit={handleEdit}
          onCancel={() => setIsEditing(false)}
          submitButtonText="Update"
        />
      )}
    </div>
  );
};

export default Comment;

```