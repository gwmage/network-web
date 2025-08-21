```typescript
import React, { useState } from 'react';
import { createComment, updateComment } from '../utils/api';

const CommentForm = ({ comment, onSubmit, onClose, postId, parentCommentId }) => {
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
        // Create new comment
        await createComment(postId, { content, parentCommentId, postId: postId }); // Include postId in request body
      }
      onSubmit(); // Callback to update comment list
      setContent(''); // Clear the input field after submitting
      onClose(); // Close the form after submission
    } catch (error) {
      console.error('Error updating/creating comment:', error);
      // Handle error, e.g., display error message
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