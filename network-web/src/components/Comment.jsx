```typescript
import React, { useState } from 'react';
import { deleteComment } from '../utils/api';

type CommentProps = {
  comment: {
    id: number;
    content: string;
    author: string;
    createdAt: string;
    postId: number;
    userId: number;
    replies?: CommentProps['comment'][]; // Add replies field
  };
  currentUser: number | null;
  onCommentDelete: (commentId: number) => void;
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

  const formattedDate = new Date(comment.createdAt).toLocaleString();

  return (
    <div className="comment">
      <p className="comment-content">{comment.content}</p>
      <p className="comment-author">By: {comment.author}</p>
      <p className="comment-date">Posted on: {formattedDate}</p>
      {currentUser === comment.userId && (
        <button onClick={handleDelete} disabled={isDeleting}>
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      )}
      {/* Render replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="replies">
          {comment.replies.map((reply) => (
            <Comment key={reply.id} comment={reply} currentUser={currentUser} onCommentDelete={onCommentDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;

```