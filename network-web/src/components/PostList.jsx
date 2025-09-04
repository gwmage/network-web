import React, { useState, useEffect } from 'react';
import { getPosts } from '../utils/api';
import { format } from 'date-fns';
import Post from './Post';
import './PostList.css';


const PostList = ({ onPostSelect, onPostDelete, onPostUpdate, filters, searchResults }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedPosts = await getPosts(currentPage, postsPerPage, filters);
        setPosts(fetchedPosts.data); // Assuming your API returns data in a 'data' field

      } catch (err) {
        setError("Error fetching posts. Please try again later.");
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage, postsPerPage, filters, onPostUpdate, searchResults]);


  const postsToDisplay = searchResults.length > 0 ? searchResults : posts;


  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = postsToDisplay.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(postsToDisplay.length / postsPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(postId);
        onPostDelete(postId);
        setCurrentPage(1); // Reset to the first page after deletion
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('Failed to delete post. Please try again later.');
      }
    }
  };


  if (loading) return <div>Loading posts...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!postsToDisplay || postsToDisplay.length === 0) return <div>No posts found.</div>;

  return (
    <div className="post-list-container"> {/* Added a container for styling */}
      {currentPosts.map((post) => (
        <Post
          key={post.id}
          post={post}
          onPostSelect={onPostSelect}
          onPostDelete={handleDelete} // Pass the handleDelete function
          currentUser={currentUser} // Make sure currentUser is being passed down.
          onPostUpdate={onPostUpdate} // Pass update handler
        />
      ))}

      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className={currentPage === number ? 'active' : ''}>
            <button onClick={() => handleClick(number)}>{number}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;