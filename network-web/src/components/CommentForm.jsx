```typescript
import React, { useState } from 'react';

const CommentForm = ({ comment, onSubmit, onClose }) => {
  const [content, setContent] = useState(comment?.content || '');

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ content });
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea value={content} onChange={handleChange} required />
      <div>
        <button type="submit">
          {comment ? 'Update Comment' : 'Add Comment'}
        </button>
        {onClose && <button type="button" onClick={onClose}>Cancel</button>}
      </div>
    </form>
  );
};

export default CommentForm;
```