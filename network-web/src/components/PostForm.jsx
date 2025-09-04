import React, { useState, useEffect } from 'react';
import { createPost, updatePost } from '../utils/api';
import './PostForm.css'; // Import CSS for styling

const PostForm = ({ post, onSubmit, onUpdate }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '', // Add category field
    tags: '',    // Add tags field
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (post) {
      setFormData({
        ...post,
        category: post.category?.id || '', // Pre-fill category if editing
        tags: post.tags?.map(tag => tag.name).join(',') || '', // Pre-fill tags if editing
      });
    }
  }, [post]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.title || !formData.content) {
      setError("Title and Content are required.");
      return;
    }

    try {
      const updatedPostData = {
        ...formData,
        category: formData.category ? parseInt(formData.category, 10) : null, // convert to number or null
        tags: formData.tags ? formData.tags.split(',').map((tag) => tag.trim()) : [],
      };


      if (post) {
        const updatedPost = await updatePost(post.id, updatedPostData);
        onUpdate(updatedPost);
      } else {
        const newPost = await createPost(updatedPostData);
        onSubmit(newPost);
        setFormData({ title: '', content: '', category: '', tags: '' }); // Clear form after submission
      }
    } catch (error) {
      setError("Failed to submit post. Please try again later.");
      console.error("Error creating/updating post:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="post-form">
      {error && <div className="error-message">{error}</div>}

      <label htmlFor="title">Title:</label>
      <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required />

      <label htmlFor="content">Content:</label>
      <textarea name="content" id="content" value={formData.content} onChange={handleChange} required />

      {/* Category select input */}
      <label htmlFor="category">Category:</label>
      <select name="category" id="category" value={formData.category} onChange={handleChange}>
        <option value="">Select a category</option>
        {/* Map through available categories (fetch from API if needed) */}
        {/* Example: Assuming categories are fetched and stored in a state variable */}
        <option value="1">General</option>
        <option value="2">Technology</option>
        <option value="3">Other</option>
      </select>

      <label htmlFor="tags">Tags (comma-separated):</label>
      <input type="text" name="tags" id="tags" value={formData.tags} onChange={handleChange} />

      <button type="submit">{post ? 'Update Post' : 'Create Post'}</button>
    </form>
  );
};

export default PostForm;