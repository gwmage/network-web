```typescript
import React, { useState } from 'react';
import './SearchBar.css'; // Import CSS file for styling

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOption, setSearchOption] = useState('all'); // Default search option

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm, searchOption);
  };

  const handleOptionChange = (event) => {
    setSearchOption(event.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search posts..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <select value={searchOption} onChange={handleOptionChange}>
        <option value="all">All</option>
        <option value="title">Title</option>
        <option value="content">Content</option>
        <option value="author">Author</option> 
      </select>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;

```