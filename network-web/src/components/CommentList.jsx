```typescript
import React, { useState, useEffect } from 'react';
import * as api from '../utils/api';
import Comment from './Comment';
import './CommentList.css';
import Pagination from './Pagination'; // Import Pagination component

const CommentList = ({ postId, onCommentUpdate }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [commentsPerPage] = useState(10); // Define comments per page

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const fetchedComments = await api.getComments(postId, currentPage, commentsPerPage);
        setComments(fetchedComments);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId, onCommentUpdate, currentPage]);

  // Get current comments
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <p>Loading comments...</p>;
  }

  if (error) {
    return <p>Error loading comments: {error.message}</p>;
  }

  if (!comments || comments.length === 0) {
    return <p>No comments yet.</p>;
  }

  return (
    <div className="comment-list-container">
      <h3>Comments</h3>
      <ul className="comment-list">
        {currentComments.map((comment) => (
          <li key={comment.id} className="comment-item">
            <Comment
              comment={comment}
              currentUser={1} // Replace with actual current user ID
              onCommentDelete={(commentId) => {
                setComments(comments.filter((c) => c.id !== commentId));
                if (onCommentUpdate) {
                  onCommentUpdate();
                }
              }}
            />
          </li>
        ))}
      </ul>
      <Pagination
        commentsPerPage={commentsPerPage}
        totalComments={comments.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default CommentList;

```