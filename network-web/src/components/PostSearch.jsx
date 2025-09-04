import React, { useState } from 'react';
import { searchPosts } from '../utils/api';
import './PostSearch.css';

const PostSearch = ({ onSearch, filters, onFilterChange }) => { // Add filters and onFilterChange props
  const [keyword, setKeyword] = useState('');
  const [searchOption, setSearchOption] = useState('all');
  const [localFilters, setLocalFilters] = useState({ ...filters }); // Store filters locally
  const [sort, setSort] = useState('recency');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const handleSearch = async () => {
    try {

      const results = await searchPosts(keyword, localFilters, sort, page, limit);
      onSearch(results.data);
    } catch (error) {
      console.error("Error searching posts:", error);
      onSearch([]);
    }
  };

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleOptionChange = (event) => {
    setSearchOption(event.target.value);
    // Reset filters when search option changes, but keep category and tags
    setLocalFilters({ ...filters, title: '', content: '', author: '' });
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setLocalFilters({ ...localFilters, [name]: value });
    // Update parent component's filters (used for general filtering)
    onFilterChange && onFilterChange({ ...localFilters, [name]: value }); // Optional chaining for safety
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  return (
    <div className="post-search-container">
      {/* ... (rest of the JSX remains unchanged) */}

      {/* Conditionally render filter inputs based on the selected option */}
      {searchOption === 'title' && (
        <input
          type="text"
          name="title"
          placeholder="Filter by title"
          value={localFilters.title}
          onChange={handleFilterChange}
        />
      )}
      {searchOption === 'content' && (
        <input
          type="text"
          name="content"
          placeholder="Filter by content"
          value={localFilters.content}
          onChange={handleFilterChange}
        />
      )}
      {searchOption === 'author' && (
        <input
          type="text"
          name="author"
          placeholder="Filter by author"
          value={localFilters.author}
          onChange={handleFilterChange}
        />
      )}
      {/* ... (rest of the JSX remains unchanged) */}
    </div>
  );
};


export default PostSearch;