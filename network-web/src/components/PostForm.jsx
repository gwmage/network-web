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
      {/* ... (rest of the form remains unchanged) */}
      <button type="submit">{post ? 'Update Post' : 'Create Post'}</button>
    </form>
  );
};

export default PostForm;

```