```typescript
import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import CommentList from './CommentList';
import './Post.css'; // Import CSS for styling

const Post = ({ post, currentUser }) => {
  const formattedDate = format(new Date(post.createdAt), 'yyyy-MM-dd HH:mm:ss');

  return (
    <div className="post-summary">
      <Link to={`/posts/${post.id}`}>
        <h3>{post.title}</h3>
      </Link>
      <p className="post-content-preview">
        {post.content.length > 200 ? `${post.content.substring(0, 200)}...` : post.content}
      </p>
      <p>By: {post.author ? post.author.username : 'Unknown Author'}</p>
      <p>Created at: {formattedDate}</p>
      <Link to={`/posts/${post.id}`} className="read-more-link">
        Read More
      </Link>

      {/* Comment section */}
      <div className="comment-section">
        <CommentList postId={post.id} currentUser={currentUser} />
      </div>
    </div>
  );
};

export default Post;

```