```typescript
import React, { useState } from 'react';

const PostForm = ({ post, onSubmit }) => {
  const [formData, setFormData] = useState(post || {
    title: '',
    content: '',
    category: '',
    tags: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <label htmlFor="content">Content:</label>
      <textarea
        id="content"
        name="content"
        value={formData.content}
        onChange={handleChange}
        required
      />

      <label htmlFor="category">Category:</label>
      <input
        type="text"
        id="category"
        name="category"
        value={formData.category}
        onChange={handleChange}
      />

      <label htmlFor="tags">Tags (comma-separated):</label>
      <input
        type="text"
        id="tags"
        name="tags"
        value={formData.tags}
        onChange={handleChange}
      />

      <button type="submit">{post ? 'Update Post' : 'Create Post'}</button>
    </form>
  );
};

export default PostForm;
```