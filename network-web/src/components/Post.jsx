```typescript
import React, { useState } from 'react';
import { deletePost } from '../utils/api';
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import { format } from 'date-fns';


const Post = ({ post, onDelete }) => {
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

  const handleCommentCreate = (newComment) => {
    // Update the post object with the new comment
    post.comments = [...post.comments, newComment];
  };

  const formattedDate = format(new Date(post.createdAt), 'yyyy-MM-dd HH:mm:ss');


  return (
    <div className="post-container">
      <Link to={`/posts/${post.id}`}><h3>{post.title}</h3></Link>
      <p>{post.content}</p>
      <p>By: {post.author ? post.author.username : 'Unknown Author'}</p>
      <p>Created at: {formattedDate}</p> {/* Display creation date */}
      <Link to={`/posts/${post.id}`}>View Details</Link>
      {post.ownedByCurrentUser && (
        <button onClick={handleDelete} disabled={isDeleting}>
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      )}
      <CommentForm postId={post.id} onCommentCreate={handleCommentCreate} />
      <CommentList comments={post.comments} postId={post.id} />
    </div>
  );
};

export default Post;

```