```typescript
import React from 'react';

const Post = ({ post }) => {
  return (
    <div className="post-container">
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <h4>Comments</h4>
      {post.comments.map((comment) => (
        <div key={comment.id} className="comment">
          <p>{comment.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Post;
```