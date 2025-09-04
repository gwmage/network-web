import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import './Post.css'; // Import CSS for styling

const Post = ({ post, currentUser, onPostSelect, onPostDelete, onPostUpdate }) => { // Add onPostDelete
  const formattedDate = format(new Date(post.createdAt), 'yyyy-MM-dd HH:mm:ss');

  const handleDelete = () => {
    onPostDelete(post.id);
  };


  return (
    <div className="post-summary">
      <Link to={`/posts/${post.id}`}>
        <h3>{post.title}</h3>
      </Link>
      <p className="post-content-preview">
        {post.content.length > 200 ? `${post.content.substring(0, 200)}...` : post.content}
      </p>
      <p>By: {post.author ? post.author.username : 'Unknown Author'}</p>
      <p>Created at: {formattedDate}</p>
      <Link to={`/posts/${post.id}`} className="read-more-link">
        Read More
      </Link>
      {/* Conditionally render the delete button if the current user is the author */}
      {currentUser && currentUser.id === post.author?.id && (
        <button onClick={handleDelete}>Delete</button>
      )}
    </div>
  );
};

export default Post;