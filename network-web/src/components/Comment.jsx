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

  // ... (rest of the functions)

  const formattedDate = new Date(comment.createdAt).toLocaleString();

  return (
    <div className={`comment ${comment.parentCommentId ? 'reply' : ''}`} style={{ marginBottom: '1rem', paddingLeft: comment.parentCommentId ? '2rem' : '0' }}>
      <div className="comment-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span className="comment-author" style={{ fontWeight: 'bold' }}>{comment.author}</span>
        <span className="comment-date" style={{ fontSize: '0.8em', color: '#999' }}>{formattedDate}</span>
      </div>
      {isEditing ? (
        <>
          <textarea value={editedContent} onChange={(e) => setEditedContent(e.target.value)} />
          <button onClick={handleEdit}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <p className="comment-content">{comment.content}</p>
          {currentUser === comment.userId && (
            <div className="comment-actions">
              <button onClick={() => setIsEditing(true)}>Edit</button>
              <button onClick={handleDelete} disabled={isDeleting}>
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          )}
          <button onClick={() => setIsReplying(true)}>Reply</button>
        </>
      )}
      {isReplying && (
        <CommentForm onSubmit={handleReply} onClose={() => setIsReplying(false)} postId={comment.postId} />
      )}
      {comment.replies && comment.replies.length > 0 && (
        <div className="replies" style={{ marginTop: '1rem' }}>
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