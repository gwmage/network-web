import { useState, useEffect } from 'react';
import PostSearch from './PostSearch'; // Import the PostSearch component

const CommunityBoard = () => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filterCategory, setFilterCategory] = useState('');
    const [filterTags, setFilterTags] = useState('');


    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`/api/posts/list?page=${currentPage}&limit=10&category=${filterCategory}&tags=${filterTags}`);
                const data = await response.json();
                setPosts(data.posts);
                setTotalPages(data.totalPages);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
        fetchPosts();
    }, [currentPage, filterCategory, filterTags]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleCategoryFilterChange = (category) => {
        setFilterCategory(category);
        setCurrentPage(1); // Reset to first page when filter changes
    };


    const handleTagFilterChange = (tags) => {
        setFilterTags(tags);
        setCurrentPage(1); // Reset to first page when filter changes
    };


  return (
    <div>
        <h2>Community Board</h2>
            <PostSearch onCategoryFilterChange={handleCategoryFilterChange} onTagFilterChange={handleTagFilterChange}/>

        <ul>
            {posts.map((post) => (
                <li key={post._id}>
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                    <p>Category: {post.category}</p>
                    <p>Tags: {post.tags.join(', ')}</p>
                </li>
            ))}
        </ul>

        <div>
            {Array.from({ length: totalPages }).map((_, index) => (
                <button key={index + 1} onClick={() => handlePageChange(index + 1)} disabled={currentPage === index + 1}>
                    {index + 1}
                </button>
            ))}
        </div>
    </div>
  );
};

export default CommunityBoard;