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
        category: post.category || '', // Handle cases where category might be missing
        tags: post.tags ? post.tags.join(',') : '',
      });
    }
  }, [post]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear any previous errors

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
      setError("Failed to submit post. Please try again later.");
      console.error("Error creating/updating post:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error-message">{error}</div>}

      <label htmlFor="title">Title:</label>
      <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required />

      <label htmlFor="content">Content:</label>
      <textarea name="content" id="content" value={formData.content} onChange={handleChange} required />

      <label htmlFor="category">Category:</label>
      <select name="category" id="category" value={formData.category} onChange={handleChange}>
        <option value="">Select a category</option>
        <option value="general">General</option>
        <option value="technology">Technology</option>
        <option value="other">Other</option>
      </select>

      <label htmlFor="tags">Tags (comma-separated):</label>
      <input type="text" name="tags" id="tags" value={formData.tags} onChange={handleChange} />

      <button type="submit">{post ? 'Update Post' : 'Create Post'}</button>
    </form>
  );
};

export default PostForm;

```