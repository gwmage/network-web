```typescript
import React, { useState } from 'react';
import { createComment, updateComment } from '../utils/api';
import './CommentForm.css';

const CommentForm = ({ comment, onSubmit, onClose, postId, parentCommentId }) => {
  const [content, setContent] = useState(comment?.content || '');
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setContent(e.target.value);
  };

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
      } else {
        // Create new comment
        await createComment({ postId, content, parentCommentId }); // Pass object to createComment
      }
      onSubmit();
      setContent('');
      onClose();
    } catch (error) {
      console.error('Error updating/creating comment:', error);
      setError('Failed to submit comment. Please try again later.');
    } finally {
      setIsUpdating(false);
    }
  };

  // ... rest of the component code
};

export default CommentForm;

```