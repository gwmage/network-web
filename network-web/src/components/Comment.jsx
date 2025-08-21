```typescript
import React, { useState } from 'react';
import { deleteComment } from '../utils/api';

type CommentProps = {
  comment: {
    id: number;
    content: string;
    author: string;
    createdAt: string;
    postId: number; // Add postId
    userId: number; // Add userId
  };
  currentUser: number | null; // Add currentUser ID
  onCommentDelete: (commentId: number) => void; // Add onCommentDelete handler
};

const Comment: React.FC<CommentProps> = ({ comment, currentUser, onCommentDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      setIsDeleting(true);
      try {
        await deleteComment(comment.postId, comment.id);
        onCommentDelete(comment.id);
      } catch (error) {
        console.error('Error deleting comment:', error);
        alert('Failed to delete comment.');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="comment">
      <p className="comment-content">{comment.content}</p>
      <p className="comment-author">By: {comment.author}</p>
      <p className="comment-date">Posted on: {comment.createdAt}</p>
      {currentUser === comment.userId && (
        <button onClick={handleDelete} disabled={isDeleting}>
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      )}
    </div>
  );
};

export default Comment;

```