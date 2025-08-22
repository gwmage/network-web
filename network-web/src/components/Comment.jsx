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

  // ... (rest of the code remains unchanged)

  return (
    <div className={`comment ${comment.parentCommentId ? 'reply' : ''} ${isEditing || isReplying ? 'expanded' : ''}`}>
      {/* ... (other elements remain unchanged) */}
      {isReplying && (
        <div className="reply-form"> {/* Added a wrapper div for reply form */}
          <CommentForm onSubmit={handleReply} onClose={() => setIsReplying(false)} postId={comment.postId} />
        </div>
      )}
      {/* ... (rest of the code remains unchanged) */}
    </div>
  );
};

export default Comment;

```

```css
/* network-web/src/styles/comment.css */
.comment {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}

.reply {
  margin-left: 20px; /* Indent replies */
  border-left: 2px solid #ddd;
}

.comment.expanded { /* Styles for expanded comment (editing or replying) */
    background-color: #f8f8f8;
}

@media (max-width: 768px) { /* Example media query for smaller screens */
  .comment {
    padding: 5px; /* Reduce padding on smaller screens */
  }
  .reply {
    margin-left: 10px; /* Reduce reply indent */
  }
  .comment-content {
    font-size: 14px; /* Reduce font size */
  }
}

.reply-form { /* Style the reply form container */
    margin-top: 10px;
    border-top: 1px solid #eee; /* Add a separator line */
    padding-top: 10px;
}

```