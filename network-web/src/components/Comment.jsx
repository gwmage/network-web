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

  const handleEdit = async () => {
    try {
      const updatedComment = await updateComment(comment.postId, comment.id, { content: editedContent });
      onCommentUpdate(updatedComment);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteComment(comment.postId, comment.id);
      onCommentDelete(comment.id);
    } catch (error) {
      console.error("Error deleting comment:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleReply = async (newComment) => {
    try {
      const createdComment = await createComment(comment.postId, { content: newComment.content, parentCommentId: comment.id });
      onCommentCreate(createdComment)
      setIsReplying(false);
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  }


  return (
    <div className={`comment ${comment.parentCommentId ? 'reply' : ''} ${isEditing || isReplying ? 'expanded' : ''}`}>
      <div className="comment-header">
        <span className="comment-author">{comment.author}</span>
        <span className="comment-date">{comment.createdAt}</span>
        {currentUser === comment.userId && (
          <div className="comment-actions">
            <button onClick={() => setIsEditing(true)} disabled={isDeleting}>Edit</button>
            <button onClick={handleDelete} disabled={isDeleting || isEditing}>Delete</button>
          </div>
        )}
      </div>
      {isEditing ? (
        <CommentForm
          comment={comment}
          onSubmit={handleEdit}
          onClose={() => setIsEditing(false)}
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
        />
      ) : (
        <p className="comment-content">{comment.content}</p>
      )}
      <button onClick={() => setIsReplying(true)}>Reply</button> {/* Reply button */}
      {isReplying && (
        <div className="reply-form">
          <CommentForm onSubmit={handleReply} onClose={() => setIsReplying(false)} postId={comment.postId} />
        </div>
      )}
      {comment.replies && comment.replies.length > 0 && (
        <ul>
          {comment.replies.map((reply) => (
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
      )}
    </div>
  );
};

export default Comment;

```