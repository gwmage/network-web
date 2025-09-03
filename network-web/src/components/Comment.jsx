```typescript
import React, { useState } from 'react';
import { deleteComment, updateComment } from '../utils/api';
import CommentForm from './CommentForm';
import { format } from 'date-fns';
import './Comment.css';

type CommentProps = {
  comment: {
    id: number;
    content: string;
    author: string;
    createdAt: string;
    postId: number;
    userId: number;
    parentCommentId: number | null;
    replies?: CommentProps['comment'][]; // Make replies optional
    children?: CommentProps['comment'][]; // Add children for nested comments
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

  const handleEdit = async (updatedContent: string) => {
    try {
      const updatedComment = await updateComment(comment.postId, comment.id, { content: updatedContent });
      onCommentUpdate(updatedComment);
      setIsEditing(false);
      setEditedContent(updatedContent);
    } catch (error) {
      console.error('Error updating comment:', error);
      // Handle error, e.g., display error message
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteComment(comment.postId, comment.id);
      onCommentDelete(comment.id);
    } catch (error) {
      console.error('Error deleting comment:', error);
      setIsDeleting(false);
      // Handle error, e.g., display error message
    }
  };

  const handleReply = async (content: string) => {
    try {
      const newComment = await createComment(comment.postId, { content, parentCommentId: comment.id });
      onCommentCreate(newComment);
      setIsReplying(false);
    } catch (error) {
      console.error('Error creating reply:', error);
      // Handle error, e.g., display error message
    }
  }


  const renderReplies = (replies: CommentProps['comment'][]) => {
    if (!replies) {
      return null;
    }
    return (
      <ul className="comment-replies">
        {replies.map((reply) => (
          <li key={reply.id}>
            <Comment
              comment={reply}
              currentUser={currentUser}
              onCommentDelete={onCommentDelete}
              onCommentCreate={onCommentCreate}
              onCommentUpdate={onCommentUpdate}
            />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className={`comment ${comment.parentCommentId ? 'reply' : ''} ${isEditing || isReplying ? 'expanded' : ''}`}>
      <div className="comment-header">
        <p className="comment-author">{comment.author}</p>
        <span className="comment-timestamp">{format(new Date(comment.createdAt), 'yyyy-MM-dd HH:mm')}</span>
      </div>
      {currentUser === comment.userId && (
        <div className="comment-actions">
          <button onClick={() => setIsEditing(true)} disabled={isDeleting}>Edit</button>
          <button onClick={handleDelete} disabled={isDeleting || isEditing}>Delete</button>
          <button onClick={() => setIsReplying(true)} disabled={isDeleting || isEditing}>Reply</button>
        </div>
      )}
      {isEditing ? (
        <CommentForm
          initialContent={comment.content}
          onSubmit={handleEdit}
          onCancel={() => setIsEditing(false)}
          submitButtonText="Update"
        />
      ) : (
        <p className="comment-content">{comment.content}</p>
      )}
      {isReplying && (
        <div className="reply-form">
          <CommentForm onSubmit={handleReply} onClose={() => setIsReplying(false)} postId={comment.postId} parentCommentId={comment.id} />
        </div>
      )}
      {renderReplies(comment.children || comment.replies)} {/* Render nested comments */}
    </div>
  );
};

export default Comment;

```