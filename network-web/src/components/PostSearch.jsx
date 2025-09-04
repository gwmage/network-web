```javascript
import React, { useState } from 'react';
import { searchPosts } from '../utils/api'; // Import the searchPosts function
import './PostSearch.css';


const PostSearch = ({ onSearch }) => {
  const [keyword, setKeyword] = useState('');
  const [searchOption, setSearchOption] = useState('all'); // Default search option
  const [filters, setFilters] = useState({ title: '', content: '', author: '' });
  const [sort, setSort] = useState('recency'); // Default sorting
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const handleSearch = async () => {
    try {
      const results = await searchPosts(keyword, filters, sort, page, limit);
      onSearch(results.data); // Pass the search results data to the parent component
    } catch (error) {
      console.error("Error searching posts:", error);
      // Handle error, e.g., show an error message to the user
      onSearch([]); // Pass an empty array in case of error
    }
  };


  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleOptionChange = (event) => {
    setSearchOption(event.target.value);
    // Reset filters when search option changes
    setFilters({ title: '', content: '', author: '' });
  };


  const handleFilterChange = (event) => {
    setFilters({ ...filters, [event.target.name]: event.target.value });
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };


  return (
    <div className="post-search-container">
      <input
        type="text"
        placeholder="Search posts..."
        value={keyword}
        onChange={handleKeywordChange}
      />
      <select value={searchOption} onChange={handleOptionChange}>
        <option value="all">All</option>
        <option value="title">Title</option>
        <option value="content">Content</option>
        <option value="author">Author</option>
      </select>


      {/* Conditionally render filter inputs based on the selected option */}
      {searchOption === 'title' && (
        <input type="text" name="title" placeholder="Filter by title" value={filters.title} onChange={handleFilterChange} />
      )}
      {searchOption === 'content' && (
        <input type="text" name="content" placeholder="Filter by content" value={filters.content} onChange={handleFilterChange} />
      )}
      {searchOption === 'author' && (
        <input type="text" name="author" placeholder="Filter by author" value={filters.author} onChange={handleFilterChange} />
      )}


      <select value={sort} onChange={handleSortChange}>
        <option value="recency">Most Recent</option>
        <option value="relevance">Relevance</option>
      </select>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default PostSearch;

```