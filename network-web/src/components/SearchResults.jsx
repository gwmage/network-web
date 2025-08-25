```typescript
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();


  useEffect(() => {
    const keyword = searchParams.get('keyword');

    const fetchResults = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/community/posts/search?keyword=${keyword}`); // Updated API endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setResults(data.items);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (keyword) { // Only fetch if keyword is present
      fetchResults();
    } else {
      setResults([]); // Clear results if keyword is empty
      setLoading(false);
    }
  }, [searchParams]);


  if (loading) {
    return <div>Loading results...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!results || results.length === 0) {
    return <div>No results found.</div>
  }


  return (
    <div>
      <h2>Search Results for "{searchParams.get('keyword')}":</h2>
      <ul>
        {results.map(result => (
          <li key={result.id}>
            <h3>{result.title}</h3>
            <p>{result.content}</p> {/* Assuming 'content' field exists */}
            {/* Add other relevant details (author, date, etc.) */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;

```