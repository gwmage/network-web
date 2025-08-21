```typescript
import React, { useState } from 'react';
import { updateComment } from '../utils/api';

const CommentForm = ({ comment, onSubmit, onClose, postId }) => {
  const [content, setContent] = useState(comment?.content || '');
  const [isUpdating, setIsUpdating] = useState(false);

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      if (comment) {
        // Update existing comment
        await updateComment(postId, comment.id, { content });
      } else {
        // Create new comment - handled by parent component
        onSubmit({ content });
      }
      onClose(); // Close the form after submission
    } catch (error) {
      console.error('Error updating/creating comment:', error);
      // Handle error, e.g., display error message
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea value={content} onChange={handleChange} required />
      <div>
        <button type="submit" disabled={isUpdating}>
          {comment ? 'Update Comment' : 'Add Comment'}
        </button>
        {onClose && <button type="button" onClick={onClose} disabled={isUpdating}>Cancel</button>}
      </div>
    </form>
  );
};

export default CommentForm;

```