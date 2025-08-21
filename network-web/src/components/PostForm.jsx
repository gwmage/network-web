```typescript
import React, { useState, useEffect } from 'react';
import { updatePost } from '../utils/api';

const PostForm = ({ post, onSubmit, onUpdate }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    tags: '',
  });

  useEffect(() => {
    if (post) {
      setFormData({
        ...post,
        tags: post.tags ? post.tags.join(',') : '',
      });
    }
  }, [post]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedPostData = {
      ...formData,
      tags: formData.tags ? formData.tags.split(',').map((tag) => tag.trim()) : [],
    };

    if (post) {
      try {
        const updatedPost = await updatePost(post.id, updatedPostData);
        onUpdate(updatedPost);
      } catch (error) {
        console.error("Error updating post:", error);
        // Handle error, e.g., display error message to user
      }
    } else {
      onSubmit(updatedPostData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title:</label>
      <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required />

      <label htmlFor="content">Content:</label>
      <textarea name="content" id="content" value={formData.content} onChange={handleChange} required />

      <label htmlFor="category">Category:</label>
      <select name="category" id="category" value={formData.category} onChange={handleChange}>
        <option value="">Select a category</option>
        {/* Replace with actual category options */}
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