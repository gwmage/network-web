```typescript
import React, { useState } from 'react';
import { deletePost } from '../utils/api';
import { Link } from 'react-router-dom';

const Post = ({ post, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setIsDeleting(true);
      try {
        await deletePost(post.id);
        onDelete(post.id); // Callback to update the parent component
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('Failed to delete post. Please try again later.');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="post-container">
      <Link to={`/posts/${post.id}`}><h3>{post.title}</h3></Link>
      <p>{post.content}</p>
      <Link to={`/posts/${post.id}/comments`}>View Comments</Link> {/* Link to comments */}
      {post.ownedByCurrentUser && (
        <button onClick={handleDelete} disabled={isDeleting}>
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      )}
    </div>
  );
};

export default Post;
```