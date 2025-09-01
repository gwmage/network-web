```typescript
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as api from '../utils/api';
import CommentList from './CommentList'; // Import CommentList
import CommentForm from './CommentForm';
import { format } from 'date-fns';
import './PostDetails.css'; // Import CSS for styling

const PostDetails = () => {
  // ... (other code remains unchanged)

  return (
    <div className="post-details-container"> {/* Add container for styling */}
      <h2>{post.title}</h2>
      <p>By: {post.author?.username || 'Unknown'}</p>
      <p>Created at: {formattedDate}</p>
      <p>{post.content}</p>

      <div className="comment-section"> {/* Add a container for comments */}
        <CommentForm onSubmit={handleCommentCreate} postId={parseInt(postId, 10)} />
        <h3>Comments</h3>
        <CommentList
          postId={postId}
          currentUser={currentUser}
          onCommentUpdate={handleCommentUpdate}
          onCommentDelete={handleCommentDelete}
        />
      </div>

      <button onClick={() => navigate(-1)}>Back to Post List</button>
    </div>
  );
};

export default PostDetails;

```