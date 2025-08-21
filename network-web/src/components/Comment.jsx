```typescript
import React from 'react';

type CommentProps = {
  comment: {
    id: number;
    content: string;
    author: string;
    createdAt: string;
  };
};

const Comment: React.FC<CommentProps> = ({ comment }) => {
  return (
    <div className="comment">
      <p className="comment-content">{comment.content}</p>
      <p className="comment-author">By: {comment.author}</p>
      <p className="comment-date">Posted on: {comment.createdAt}</p>
    </div>
  );
};

export default Comment;
```