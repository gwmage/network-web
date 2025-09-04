```typescript
import React, { useState } from 'react';
import { deleteComment, updateComment } from '../utils/api';
import CommentForm from './CommentForm';
import { format } from 'date-fns';
import './Comment.css';

// ... (Other imports and types remain unchanged)

const Comment = ({ comment, currentUser, onCommentDelete, onCommentCreate, onCommentUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);


  const handleEdit = async (updatedContent) => {
    try {
      await updateComment(comment.postId, comment.id, { content: updatedContent });
      setIsEditing(false);
      onCommentUpdate && onCommentUpdate(); // Call the update handler 
    } catch (error) {
      console.error("Error updating comment:", error);
      // Handle error, e.g., display error message
    }
  };

  const handleDelete = async () => {
    try {
      await deleteComment(comment.id);
      onCommentDelete && onCommentDelete(comment.id);
      onCommentUpdate && onCommentUpdate(); // Call the update handler
    } catch (error) {
      console.error("Error deleting comment:", error);
      // Handle error, e.g., display error message
    }
  };



  const renderReplies = (replies) => {
    if (!replies) {
      return null;
    }
    return (
      <ul className="comment-replies">
        {replies.map((reply) => (
          <li key={reply.id} className={`comment-reply level-${reply.level || 0}`}> {/* Add class for styling based on level */}
            <Comment
              comment={reply}
              currentUser={currentUser}
              onCommentDelete={onCommentDelete}
              onCommentCreate={onCommentCreate}
              onCommentUpdate={onCommentUpdate} // Pass the update handler
            />
            {reply.children && renderReplies(reply.children)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="comment-container">
      <div className="comment-header">
        <p className="comment-author">{comment.author ? comment.author.username : 'Unknown Author'}</p>
        <span className="comment-timestamp">
          {format(new Date(comment.createdAt), 'yyyy-MM-dd HH:mm')}
        </span>
      </div>
      {/* ... (Other JSX remains unchanged) */}

        {isEditing ? (
            <CommentForm
                comment={comment}
                onSubmit={handleEdit}
                onClose={() => setIsEditing(false)}
                postId={comment.postId} // Add postId here
            />
        ) : (
            <p className="comment-content">{comment.content}</p>
        )}
      
      {/* Conditionally render edit and delete buttons */}
        {currentUser && currentUser.id === comment.author?.id && (
            <div className="comment-actions">
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
            </div>
        )}
        <button onClick={() => setIsReplying(!isReplying)}>Reply</button>

        {isReplying && (
        <CommentForm
            onSubmit={(newCommentContent) => {
            onCommentCreate && onCommentCreate(newCommentContent, comment.id);
            setIsReplying(false);
            }}
            onClose={() => setIsReplying(false)}
            postId={comment.postId}
            parentCommentId={comment.id}
        />
        )}

      {comment.children && renderReplies(comment.children)}
    </div>
  );
};

export default Comment;

```