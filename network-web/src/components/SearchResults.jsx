```typescript
import React, { useState, useEffect } from 'react';
import CommentForm from './CommentForm';
import MatchingResultNotifications from './MatchingResultNotifications';
import './SearchResults.css';

const SearchResults = ({ results }) => {
  const [showNotifications, setShowNotifications] = useState(false);

  if (!results || results.length === 0) {
    return <p>No results found.</p>;
  }

  return (
    <div>
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
      <div className="notifications-section">
        <button onClick={() => setShowNotifications(!showNotifications)}>
          {showNotifications ? 'Hide Notifications' : 'Show Notifications'}
        </button>
        {showNotifications && <MatchingResultNotifications />}
      </div>
    </div>
  );
};

export default SearchResults;

```