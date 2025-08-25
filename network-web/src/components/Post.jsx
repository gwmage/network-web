```typescript
import React, { useState } from 'react';
import { deletePost, updatePost } from '../utils/api';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

const Post = ({ post, onDelete, currentUser, onUpdate }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPost, setEditedPost] = useState({ ...post });

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

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const updatedPost = await updatePost(post.id, editedPost);
      onUpdate(updatedPost);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Failed to update post. Please try again later.');
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedPost({ ...post });
  };

  return (
    <div className="post-container">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedPost.title}
            onChange={(e) => setEditedPost({ ...editedPost, title: e.target.value })}
          />
          <textarea
            value={editedPost.content}
            onChange={(e) => setEditedPost({ ...editedPost, content: e.target.value })}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      ) : (
        <>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </>
      )}

      {post.ownedByCurrentUser && (
        <>
          <button onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
          <button onClick={handleEdit} disabled={isEditing}>
            {isEditing ? 'Editing...' : 'Edit'}
          </button>
        </>
      )}
      <CommentList comments={post.comments} postId={post.id} currentUser={currentUser} />
      <CommentForm postId={post.id} currentUser={currentUser} />
    </div>
  );
};

export default Post;

```