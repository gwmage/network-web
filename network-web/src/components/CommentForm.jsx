```typescript
import React, { useState } from 'react';
import { createComment, updateComment } from '../utils/api';

const CommentForm = ({ comment, onSubmit, onClose, postId, parentCommentId }) => {
  const [content, setContent] = useState(comment?.content || '');
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    setError(null); // Clear any previous errors

    try {
      if (comment) {
        // Update existing comment
        await updateComment(postId, comment.id, { content });
      } else {
        // Create new comment
        await createComment(postId, { content, parentCommentId });
      }
      onSubmit();
      setContent('');
      onClose();
    } catch (error) {
      console.error('Error updating/creating comment:', error);
      setError('Failed to submit comment. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <textarea
        value={content}
        onChange={handleChange}
        required
        placeholder="Write your comment..."
        className="comment-textarea"
      />
      {error && <div className="comment-error">{error}</div>}
      <div className="comment-buttons">
        <button type="submit" disabled={isUpdating} className="comment-submit">
          {comment ? 'Update Comment' : 'Add Comment'}
        </button>
        {onClose && (
          <button type="button" onClick={onClose} disabled={isUpdating} className="comment-cancel">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default CommentForm;

```