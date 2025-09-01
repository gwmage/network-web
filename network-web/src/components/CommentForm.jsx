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
        await createComment({ postId, content, parentCommentId });
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

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <textarea
        value={content}
        onChange={handleChange}
        placeholder="Write your comment..."
        disabled={isUpdating}
        className="comment-form-textarea"
      />
      {error && <div className="error-message">{error}</div>}
      <button type="submit" disabled={isUpdating} className="comment-form-button">
        {isUpdating ? 'Submitting...' : comment ? 'Update' : 'Submit'}
      </button>
      {comment && <button type="button" onClick={onClose} disabled={isUpdating} className="comment-form-button">Cancel</button>}
    </form>
  );
};

export default CommentForm;

```