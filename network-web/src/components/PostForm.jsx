```typescript
import React, { useState, useEffect } from 'react';
import { createPost, updatePost } from '../utils/api';

const PostForm = ({ post, onSubmit, onUpdate }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    tags: '',
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (post) {
      setFormData({
        ...post,
        category: post.category || '',
        tags: post.tags ? post.tags.join(',') : '',
      });
    }
  }, [post]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const updatedPostData = {
      ...formData,
      tags: formData.tags ? formData.tags.split(',').map((tag) => tag.trim()) : [],
    };

    try {
      if (post) {
        const updatedPost = await updatePost(post.id, updatedPostData);
        onUpdate(updatedPost);
      } else {
        const newPost = await createPost(updatedPostData);
        onSubmit(newPost);
      }
    } catch (error) {
      console.error("Error creating/updating post:", error);
      setError("Failed to create/update post. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} />
      <textarea name="content" placeholder="Content" value={formData.content} onChange={handleChange} />
      <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} />
      <input type="text" name="tags" placeholder="Tags (comma-separated)" value={formData.tags} onChange={handleChange} />

      {error && <div style={{ color: 'red' }}>{error}</div>}

      <button type="submit">{post ? 'Update Post' : 'Create Post'}</button>
    </form>
  );
};

export default PostForm;

```