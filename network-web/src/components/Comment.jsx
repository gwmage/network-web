```typescript
import React, { useState } from 'react';
import { deleteComment, updateComment } from '../utils/api';
import CommentForm from './CommentForm';

// ... (Other imports and types remain unchanged)

const Comment: React.FC<CommentProps> = ({ comment, currentUser, onCommentDelete, onCommentCreate, onCommentUpdate }) => {
  // ... (Other state variables remain unchanged)

  const handleEdit = async (updatedContent: string) => {
    // ... (This function remains unchanged)
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      try {
        setIsDeleting(true);
        await deleteComment(comment.postId, comment.id);
        onCommentDelete(comment.id); // Remove the comment from the UI
      } catch (error) {
        console.error("Error deleting comment:", error);
        // Handle error, e.g., display error message
      } finally {
        setIsDeleting(false);
      }
    }
  };

  // ... (Other functions remain unchanged)

  return (
    // ... (JSX remains unchanged)
  );
};

export default Comment;

```