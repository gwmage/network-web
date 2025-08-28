```typescript
import React, { useState, useEffect } from 'react';
import './SearchBar.css';
import * as api from '../utils/api';
import { Link } from 'react-router-dom';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOption, setSearchOption] = useState('all');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);

    if (newSearchTerm.length > 0) {
      try {
        const suggestions = await api.getAutocompleteSuggestions(newSearchTerm);
        setSuggestions(suggestions);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSearch = () => {
    onSearch(searchTerm, searchOption);
  };

  const handleOptionChange = (event) => {
    setSearchOption(event.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
    onSearch(suggestion, searchOption);
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
      <ul className="suggestions">
        {suggestions.map((suggestion, index) => (
          <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
            {suggestion}
          </li>
        ))}
      </ul>
      <Link to="/reservations" className="reservation-link">Make a Reservation</Link>
    </div>
  );
};

export default SearchBar;
```