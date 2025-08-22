```typescript
import React, { useState } from 'react';
import { deletePost } from '../utils/api';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

const Post = ({ post, onDelete, currentUser }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setIsDeleting(true);
      try {
        await deletePost(post.id);
        onDelete(post.id);
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
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      {post.ownedByCurrentUser && (
        <button onClick={handleDelete} disabled={isDeleting}>
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      )}
      <CommentList comments={post.comments} postId={post.id} currentUser={currentUser} />
      <CommentForm postId={post.id} currentUser={currentUser}/>
    </div>
  );
};

export default Post;

```