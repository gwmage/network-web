```typescript
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import './SearchResults.css'; // Import CSS for styling

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 10; // Number of results per page
  const [totalCount, setTotalCount] = useState(0);


  useEffect(() => {
    const keyword = searchParams.get('keyword');

    const fetchResults = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/community/posts/search?keyword=${keyword}&page=${currentPage}&limit=${resultsPerPage}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setResults(data.items);
        setTotalCount(data.totalCount); // Update totalCount
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (keyword) {
      fetchResults();
    } else {
      setResults([]);
      setLoading(false);
      setTotalCount(0);
    }
  }, [searchParams, currentPage]);

  if (loading) {
    return <div>Loading results...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!results || results.length === 0) {
    return <div>No results found.</div>;
  }

  const totalPages = Math.ceil(totalCount / resultsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="search-results-container">
      <h2>Search Results for "{searchParams.get('keyword')}":</h2>
      <ul>
        {results.map(result => (
          <li key={result.id} className="search-result-item">
            <h3>{result.title}</h3>
            <p>{result.content.substring(0, 100)}...</p>
            <p>Author: {result.author}</p>
          </li>
        ))}
      </ul>
      <div className="pagination">
        {pageNumbers.map(number => (
          <button key={number} onClick={() => handlePageChange(number)} className={currentPage === number ? 'active' : ''}>
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;

```