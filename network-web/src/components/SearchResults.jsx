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

```css
/* SearchResults.css */
.search-results {
  list-style: none;
  padding: 0;
  margin: 0;
}

.search-result-item {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.comment-section {
  margin-top: 10px;
  padding: 10px;
  border-top: 1px solid #eee;
}

@media (max-width: 768px) {
  .search-result-item {
    padding: 5px;
  }
  .comment-section {
    padding: 5px;
  }
}
```