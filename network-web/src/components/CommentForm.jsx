```typescript
import React, { useState } from 'react';
import { createComment, updateComment } from '../utils/api';
import './CommentForm.css';

const CommentForm = ({ comment, onSubmit, onClose, postId, parentCommentId }) => {
  const [content, setContent] = useState(comment?.content || '');
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState('');

  // ... (handleChange remains unchanged)

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
      setError('Comment cannot be empty.');
      return;
    }

    if (content.length > 255) {
      setError('Comment is too long (max 255 characters).');
      return;
    }

    setError('');
    setIsUpdating(true);

    try {
      if (comment) {
        // Update existing comment
        await updateComment(postId, comment.id, { content });
        onSubmit(content); // Pass the updated content to the parent
      } else {
        // Create new comment
        await createComment(postId, { content, parentCommentId });
        onSubmit(content, parentCommentId); // Pass content and parentCommentId
      }

      setContent('');
      onClose && onClose(); // Call onClose if it exists
    } catch (error) {
      console.error('Error updating/creating comment:', error);
      setError('Failed to submit comment. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };


  return (
    <form onSubmit={handleSubmit} className="comment-form">
       {/* ... (rest of the form remains unchanged) */}
    </form>
  );
};

export default CommentForm;

```