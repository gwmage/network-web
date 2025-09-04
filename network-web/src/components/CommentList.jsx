import React, { useEffect, useState } from 'react';
import Comment from './Comment';
import CommentForm from './CommentForm'; // Import CommentForm
import './CommentList.css';
import { getComments } from '../utils/api';

const CommentList = ({ postId, currentUser, onCommentUpdate }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const fetchedComments = await getComments(postId);
        setComments(fetchedComments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [postId, onCommentUpdate]);

  const handleCommentCreate = async (newCommentContent, parentCommentId) => {
    try {
      await createComment(postId, {
        content: newCommentContent,
        parentCommentId: parentCommentId,
      });
      onCommentUpdate && onCommentUpdate();
    } catch (error) {
      console.error('Error creating comment:', error);
      // Handle error, e.g., display an error message
    }
  };

  const handleCommentDelete = (commentId) => {
    setComments(
      comments.filter(comment => comment.id !== commentId),
    );
    onCommentUpdate && onCommentUpdate();
  };

  // Recursive function to render comments with nested replies
  const renderComments = (commentList) => {
    if (!commentList || commentList.length === 0) {
      return <p>No comments yet.</p>;
    }
    return (
      <ul className="comment-list">
        {commentList.map(comment => (
          <li key={comment.id} className="comment-item">
            <Comment
              comment={comment}
              currentUser={currentUser}
              onCommentDelete={handleCommentDelete} // Pass delete handler
              onCommentCreate={handleCommentCreate} // Pass create handler
              onCommentUpdate={onCommentUpdate} // Pass the update handler
            />

            {comment.children && renderComments(comment.children)} {/* Render nested comments */}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="comment-list-container">
      {/* New comment form */}
      <CommentForm onSubmit={content => handleCommentCreate(content)} postId={postId} />
      {/* Render the comment list */}
      {renderComments(comments)}
    </div>
  );
};



export default CommentList;