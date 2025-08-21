```typescript
import React, { useState } from 'react';
import { deleteComment, createComment, updateComment } from '../utils/api';
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
    replies: CommentProps['comment'][];
  };
  currentUser: number | null;
  onCommentDelete: (commentId: number) => void;
  onCommentCreate: (comment: CommentProps['comment']) => void;
  onCommentUpdate: (comment: CommentProps['comment']) => void;
};

const Comment: React.FC<CommentProps> = ({ comment, currentUser, onCommentDelete, onCommentCreate, onCommentUpdate }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

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

  const handleEdit = async () => {
    try {
      const updatedComment = await updateComment(comment.postId, comment.id, { content: editedContent });
      onCommentUpdate(updatedComment);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating comment:', error);
      alert('Failed to update comment.');
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

  const formattedDate = new Date(comment.createdAt).toLocaleString();

  return (
    <div className={`comment ${comment.parentCommentId ? 'reply' : ''}`}>
      {isEditing ? (
        <>
          <textarea value={editedContent} onChange={(e) => setEditedContent(e.target.value)} />
          <button onClick={handleEdit}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <p className="comment-content">{comment.content}</p>
          <p className="comment-author">By: {comment.author}</p>
          <p className="comment-date">Posted on: {formattedDate}</p>
          {currentUser === comment.userId && (
            <>
              <button onClick={() => setIsEditing(true)}>Edit</button>
              <button onClick={handleDelete} disabled={isDeleting}>
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </>
          )}
          <button onClick={() => setIsReplying(true)}>Reply</button>
        </>
      )}
      {isReplying && (
        <CommentForm onSubmit={handleReply} onClose={() => setIsReplying(false)} postId={comment.postId} />
      )}
      {comment.replies && comment.replies.length > 0 && (
        <div className="replies">
          {comment.replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              currentUser={currentUser}
              onCommentDelete={onCommentDelete}
              onCommentCreate={onCommentCreate}
              onCommentUpdate={onCommentUpdate}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;

```