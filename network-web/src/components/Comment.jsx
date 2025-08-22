```typescript
import React, { useState } from 'react';
import { deleteComment, updateComment } from '../utils/api';
import CommentForm from './CommentForm';

type CommentProps = {
  comment: {
    id: number;
    content: string;
    author: string;
    createdAt: string;
    postId: number;
    userId: number;
  };
  currentUser: number | null;
  onCommentDelete: (commentId: number) => void;
  onCommentUpdate: (comment: {id: number, content: string}) => void;
};

const Comment: React.FC<CommentProps> = ({ comment, currentUser, onCommentDelete, onCommentUpdate }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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

  const handleUpdate = async (updatedComment: {content: string}) => {
      try {
          const returnedComment = await updateComment(comment.postId, comment.id, updatedComment);
          onCommentUpdate(returnedComment)
      }
      catch (error) {
          console.error('Error updating comment', error);
          alert('Failed to update comment');
      } finally {
          setIsEditing(false);
      }
  }

  const handleEditClick = () => {
    setIsEditing(true)
  }


  return (
    <div className="comment">
      {isEditing ? (
        <CommentForm comment={comment} onSubmit={handleUpdate} onClose={() => setIsEditing(false)}/>
      ): (
        <>
          <p className="comment-content">{comment.content}</p>
          <p className="comment-author">By: {comment.author}</p>
          <p className="comment-date">Posted on: {comment.createdAt}</p>
          {currentUser === comment.userId && (
            <>
              <button onClick={handleEditClick} disabled={isDeleting}>Edit</button>
              <button onClick={handleDelete} disabled={isDeleting}>
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </>
          )}
        </>
      )}

    </div>
  );
};

export default Comment;

```