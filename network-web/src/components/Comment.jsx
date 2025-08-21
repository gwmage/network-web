```typescript
import React, { useState } from 'react';
import { deleteComment, createComment } from '../utils/api';
import CommentForm from './CommentForm';

type CommentProps = {
  comment: {
    id: number;
    content: string;
    author: string;
    createdAt: string;
    postId: number;
    userId: number;
    parentCommentId: number | null;
    replies: CommentProps['comment'][]; // Add replies field
  };
  currentUser: number | null;
  onCommentDelete: (commentId: number) => void;
  onCommentCreate: (comment: CommentProps['comment']) => void; // Add onCommentCreate handler
};

const Comment: React.FC<CommentProps> = ({ comment, currentUser, onCommentDelete, onCommentCreate }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isReplying, setIsReplying] = useState(false);

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

  const handleReply = async (content: string) => {
    try {
      const newComment = await createComment(comment.postId, { content, parentCommentId: comment.id });
      onCommentCreate(newComment);
      setIsReplying(false);
    } catch (error) {
      console.error('Error creating comment:', error);
      alert('Failed to create comment.');
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
      <button onClick={() => setIsReplying(true)}>Reply</button>
      {isReplying && (
        <CommentForm onSubmit={handleReply} onClose={() => setIsReplying(false)} postId={comment.postId} />
      )}
      {comment.replies && comment.replies.length > 0 && (
        <div className="replies">
          {comment.replies.map((reply) => (
            <Comment key={reply.id} comment={reply} currentUser={currentUser} onCommentDelete={onCommentDelete} onCommentCreate={onCommentCreate} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;

```