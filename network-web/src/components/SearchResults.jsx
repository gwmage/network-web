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
          {/* ... other content rendering ... */}
          <CommentForm postId={result.id} />
        </li>
      ))}
    </ul>
  );
};

export default SearchResults;

```