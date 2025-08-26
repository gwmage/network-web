```typescript
import React from 'react';
import CommentForm from './CommentForm';
import './SearchResults.css';

const SearchResults = ({ results }) => {
  if (!results || results.length === 0) {
    return <p>No results found.</p>;
  }

  return (
    <ul className="search-results">
      {results.map((result) => (
        <li key={result.id} className="search-result-item">
          <h3>{result.name}</h3>
          <p>{result.address}</p>
          {/* Display other relevant information */}
          <div className="comment-section">
            <CommentForm postId={result.id} />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default SearchResults;

```