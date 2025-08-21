```typescript
import React from 'react';

const CommentList = ({ comments }) => {
  if (!comments || comments.length === 0) {
    return <p>No comments yet.</p>;
  }

  return (
    <div>
      <h3>Comments</h3>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <p>{comment.content}</p>
            <p>By: {comment.author}</p> {/* Assuming 'author' field exists */}
            <p>Posted on: {comment.createdAt}</p> {/* Assuming 'createdAt' field exists */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentList;
```